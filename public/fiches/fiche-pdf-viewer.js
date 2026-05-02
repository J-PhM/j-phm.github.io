/* ════════════════════════════════════════════════════════════════
   Lecteur PDF modal plein-écran — utilise PDF.js (Mozilla)
   Rend les PDFs en canvas, donc fonctionne même si le serveur
   envoie Content-Disposition: attachment.
   Usage : window.openPdf(url, title)
   ──────────────────────────────────────────────────────────────── */

(function(){
  if (window.openPdf) return;

  // CSS
  const style = document.createElement('style');
  style.textContent = `
    .jpm-pdf-overlay {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(20, 16, 12, 0.88);
      display: flex; flex-direction: column;
      padding: clamp(12px, 3vw, 40px);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      animation: jpmPdfFadeIn 180ms ease;
      font-family: 'EB Garamond', Georgia, serif;
    }
    @keyframes jpmPdfFadeIn { from { opacity: 0; } to { opacity: 1; } }
    .jpm-pdf-header {
      display: flex; align-items: center; gap: 12px;
      padding: 0 4px 14px; color: #fbf7ef;
      flex-wrap: wrap;
    }
    .jpm-pdf-header-text { flex: 1; min-width: 200px; }
    .jpm-pdf-eyebrow {
      font-family: 'Cormorant Garamond', serif;
      font-size: 10.5px; letter-spacing: .16em;
      text-transform: uppercase; opacity: .65; font-weight: 500;
    }
    .jpm-pdf-title {
      font-family: 'Marcellus', serif;
      font-size: 18px; line-height: 1.3; margin-top: 4px;
      overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap; font-style: italic;
    }
    .jpm-pdf-pageinfo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 13px; color: rgba(251,247,239,.7);
      letter-spacing: .05em; min-width: 5em; text-align: center;
    }
    .jpm-pdf-btn {
      font-family: 'Cormorant Garamond', serif;
      font-size: 11px; letter-spacing: .06em;
      padding: 8px 14px; border: 1px solid rgba(255,255,255,.35);
      background: transparent; color: #fbf7ef;
      cursor: pointer; transition: all .18s;
      text-decoration: none; border-radius: 2px;
      font-weight: 500; white-space: nowrap;
    }
    .jpm-pdf-btn:hover:not(:disabled) { border-color: #fbf7ef; background: rgba(255,255,255,.06); }
    .jpm-pdf-btn:disabled { opacity: .35; cursor: not-allowed; }
    .jpm-pdf-close {
      width: 36px; height: 36px; display: inline-flex;
      align-items: center; justify-content: center;
      background: transparent;
      border: 1px solid rgba(255,255,255,.35);
      color: #fbf7ef; cursor: pointer;
      font-size: 18px; line-height: 1;
      font-family: inherit; transition: all .18s;
      border-radius: 2px;
    }
    .jpm-pdf-close:hover { border-color: #fbf7ef; background: rgba(255,255,255,.08); }
    .jpm-pdf-stage {
      flex: 1; min-height: 0;
      background: #2a241a;
      border: 1px solid rgba(255,255,255,.15);
      box-shadow: 0 10px 40px rgba(0,0,0,.4);
      position: relative;
      overflow: auto;
      padding: 24px;
      display: flex; flex-direction: column;
      align-items: center; gap: 18px;
    }
    .jpm-pdf-page-canvas {
      background: #fbf7ef;
      box-shadow: 0 4px 18px rgba(0,0,0,.3);
      max-width: 100%;
      height: auto;
    }
    .jpm-pdf-status {
      position: absolute; inset: 0;
      display: grid; place-items: center;
      color: rgba(251,247,239,.75); padding: 24px;
      pointer-events: none;
    }
    .jpm-pdf-status-inner { text-align: center; max-width: 520px; }
    .jpm-pdf-status-title {
      font-family: 'Marcellus', serif;
      font-size: 18px; font-style: italic;
    }
    .jpm-pdf-status-sub {
      font-family: 'Cormorant Garamond', serif;
      font-size: 10.5px; letter-spacing: .16em;
      text-transform: uppercase; margin-top: 10px;
      opacity: .6; font-weight: 500;
    }
    .jpm-pdf-error-actions { margin-top: 18px; display: inline-flex; gap: 10px; pointer-events: auto; }
    @media (max-width: 640px) {
      .jpm-pdf-header { gap: 6px; }
      .jpm-pdf-btn { font-size: 10px; padding: 6px 9px; }
      .jpm-pdf-stage { padding: 12px; }
    }
  `;
  document.head.appendChild(style);

  // Charger PDF.js depuis CDN (une seule fois)
  let pdfjsPromise = null;
  function loadPdfJs() {
    if (pdfjsPromise) return pdfjsPromise;
    pdfjsPromise = new Promise((resolve, reject) => {
      const VERSION = '3.11.174';
      const script = document.createElement('script');
      script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${VERSION}/pdf.min.js`;
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${VERSION}/pdf.worker.min.js`;
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('pdfjsLib not loaded'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load pdf.js'));
      document.head.appendChild(script);
    });
    return pdfjsPromise;
  }

  let currentOverlay = null;
  let currentDoc = null;
  let currentPage = 1;
  let renderingPage = false;
  let currentScale = 1.5;

  function closePdf() {
    if (!currentOverlay) return;
    if (currentDoc) { try { currentDoc.destroy(); } catch(_) {} currentDoc = null; }
    currentOverlay.remove();
    currentOverlay = null;
    currentPage = 1;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (!currentOverlay) return;
    if (e.key === 'Escape') closePdf();
    else if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); goToPage(currentPage + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goToPage(currentPage - 1); }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    })[c]);
  }

  async function renderPage(pageNum) {
    if (!currentDoc || renderingPage) return;
    if (pageNum < 1 || pageNum > currentDoc.numPages) return;
    renderingPage = true;
    currentPage = pageNum;

    const stage = currentOverlay.querySelector('.jpm-pdf-stage');
    const pageInfo = currentOverlay.querySelector('.jpm-pdf-pageinfo');
    if (pageInfo) pageInfo.textContent = `${pageNum} / ${currentDoc.numPages}`;

    // Boutons prev/next
    const prevBtn = currentOverlay.querySelector('.jpm-pdf-prev');
    const nextBtn = currentOverlay.querySelector('.jpm-pdf-next');
    if (prevBtn) prevBtn.disabled = pageNum <= 1;
    if (nextBtn) nextBtn.disabled = pageNum >= currentDoc.numPages;

    try {
      const page = await currentDoc.getPage(pageNum);

      // Calculer le scale optimal selon la largeur disponible
      const stageWidth = stage.clientWidth - 48;
      const baseViewport = page.getViewport({ scale: 1 });
      const fitScale = Math.min(stageWidth / baseViewport.width, 2);
      const scale = Math.max(fitScale, 1) * (window.devicePixelRatio || 1);

      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.className = 'jpm-pdf-page-canvas';
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = (viewport.width / (window.devicePixelRatio || 1)) + 'px';
      canvas.style.height = (viewport.height / (window.devicePixelRatio || 1)) + 'px';

      stage.innerHTML = '';
      stage.appendChild(canvas);
      stage.scrollTop = 0;

      await page.render({
        canvasContext: canvas.getContext('2d'),
        viewport,
      }).promise;
    } catch (err) {
      console.error('PDF render error', err);
    } finally {
      renderingPage = false;
    }
  }

  function goToPage(n) { renderPage(n); }

  window.openPdf = async function(url, title) {
    if (currentOverlay) closePdf();

    const overlay = document.createElement('div');
    overlay.className = 'jpm-pdf-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', title || 'PDF');

    overlay.innerHTML = `
      <div class="jpm-pdf-header">
        <div class="jpm-pdf-header-text">
          <div class="jpm-pdf-eyebrow">PDF</div>
          <div class="jpm-pdf-title">${escapeHtml(title || 'Document')}</div>
        </div>
        <button class="jpm-pdf-btn jpm-pdf-prev" type="button" aria-label="Page précédente" disabled>← Préc.</button>
        <span class="jpm-pdf-pageinfo">— / —</span>
        <button class="jpm-pdf-btn jpm-pdf-next" type="button" aria-label="Page suivante" disabled>Suiv. →</button>
        <a class="jpm-pdf-btn" href="${escapeHtml(url)}" download>Télécharger ↓</a>
        <button class="jpm-pdf-close" aria-label="Fermer">✕</button>
      </div>
      <div class="jpm-pdf-stage">
        <div class="jpm-pdf-status">
          <div class="jpm-pdf-status-inner">
            <div class="jpm-pdf-status-title">Chargement du document…</div>
            <div class="jpm-pdf-status-sub">loading</div>
          </div>
        </div>
      </div>
    `;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePdf();
    });
    overlay.querySelector('.jpm-pdf-close').addEventListener('click', closePdf);
    overlay.querySelector('.jpm-pdf-prev').addEventListener('click', () => goToPage(currentPage - 1));
    overlay.querySelector('.jpm-pdf-next').addEventListener('click', () => goToPage(currentPage + 1));

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    currentOverlay = overlay;

    try {
      const pdfjsLib = await loadPdfJs();
      const loadingTask = pdfjsLib.getDocument({
        url,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true,
      });
      currentDoc = await loadingTask.promise;
      currentPage = 1;
      await renderPage(1);
    } catch (err) {
      console.error('PDF load error', err);
      const stage = overlay.querySelector('.jpm-pdf-stage');
      if (stage) {
        stage.innerHTML = `
          <div class="jpm-pdf-status">
            <div class="jpm-pdf-status-inner">
              <div class="jpm-pdf-status-title">Impossible de charger ce PDF.</div>
              <div class="jpm-pdf-status-sub">erreur</div>
              <div class="jpm-pdf-error-actions">
                <a class="jpm-pdf-btn" href="${escapeHtml(url)}" target="_blank" rel="noopener">Ouvrir dans un onglet ↗</a>
                <a class="jpm-pdf-btn" href="${escapeHtml(url)}" download>Télécharger ↓</a>
              </div>
            </div>
          </div>
        `;
      }
    }
  };

  // Re-render on resize (avec debounce)
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    if (!currentOverlay || !currentDoc) return;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => renderPage(currentPage), 250);
  });

  window.closePdf = closePdf;
})();
