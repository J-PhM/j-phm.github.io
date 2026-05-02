// Full-screen modal PDF reader. Opens when usePdfViewer().open(url, title) is called.
// Uses the browser's built-in PDF viewer via <iframe>.
(function(){
  const PdfCtx = React.createContext(null);

  function PdfProvider({ children }) {
    const [state, setState] = React.useState(null); // { url, title, blobUrl, loading, error } | null

    const open = React.useCallback((url, title) => {
      setState({ url, title, blobUrl: null, loading: true, error: null });
    }, []);
    const close = React.useCallback(() => {
      setState(s => {
        if (s && s.blobUrl && !s.usingGview) URL.revokeObjectURL(s.blobUrl);
        return null;
      });
    }, []);

    // Fetch PDF as blob to bypass Content-Disposition: attachment headers.
    // Falls back to direct iframe if fetch fails (CORS, etc).
    React.useEffect(() => {
      if (!state || !state.loading) return;
      let cancelled = false;
      (async () => {
        try {
          const res = await fetch(state.url, { mode: 'cors' });
          if (!res.ok) throw new Error('HTTP ' + res.status);
          const blob = await res.blob();
          if (cancelled) return;
          // Force PDF MIME so the browser renders it inline even if server sent octet-stream.
          const pdfBlob = blob.type === 'application/pdf' ? blob : new Blob([blob], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(pdfBlob);
          setState(s => s ? { ...s, blobUrl, loading: false, error: null } : s);
        } catch (err) {
          if (cancelled) return;
          // CORS or network error — fall back to Google Docs Viewer (server-side fetch).
          const gviewUrl = 'https://docs.google.com/viewer?embedded=true&url=' + encodeURIComponent(state.url);
          setState(s => s ? { ...s, loading: false, error: null, blobUrl: gviewUrl, usingGview: true } : s);
        }
      })();
      return () => { cancelled = true; };
    }, [state?.url, state?.loading]);

    // Close on Escape
    React.useEffect(() => {
      if (!state) return;
      const onKey = (e) => { if (e.key === 'Escape') close(); };
      window.addEventListener('keydown', onKey);
      // Lock body scroll while modal is open
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = prevOverflow;
      };
    }, [state, close]);

    return (
      <PdfCtx.Provider value={{ open, close }}>
        {children}
        {state && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={state.title || 'PDF'}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: 'rgba(20, 16, 12, 0.82)',
              display: 'flex', flexDirection: 'column',
              padding: 'clamp(12px, 3vw, 40px)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              animation: 'jpmPdfFadeIn 180ms ease',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '0 4px 14px',
              color: 'var(--paper)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="jpm-mono" style={{
                  fontSize: 10.5, letterSpacing: '.16em',
                  textTransform: 'uppercase', opacity: .65,
                }}>
                  PDF
                </div>
                <div className="jpm-serif-display" style={{
                  fontSize: 18, lineHeight: 1.3, marginTop: 4,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  fontStyle: 'italic',
                }}>
                  {state.title || 'Document'}
                </div>
              </div>
              <a
                href={state.url}
                download
                className="jpm-btn ghost"
                style={{
                  fontSize: 11,
                  borderColor: 'rgba(255,255,255,.35)',
                  color: 'var(--paper)',
                  background: 'transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--paper)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)'; }}
              >
                Télécharger ↓
              </a>
              <a
                href={state.url}
                target="_blank"
                rel="noopener"
                className="jpm-btn ghost"
                style={{
                  fontSize: 11,
                  borderColor: 'rgba(255,255,255,.35)',
                  color: 'var(--paper)',
                  background: 'transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--paper)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)'; }}
              >
                Ouvrir dans un onglet ↗
              </a>
              <button
                onClick={close}
                aria-label="Fermer"
                style={{
                  width: 36, height: 36, display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,.35)',
                  color: 'var(--paper)',
                  cursor: 'pointer', fontSize: 18, lineHeight: 1,
                  fontFamily: 'inherit',
                  transition: 'all .18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--paper)'; e.currentTarget.style.background = 'rgba(255,255,255,.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.35)'; e.currentTarget.style.background = 'transparent'; }}
              >
                ✕
              </button>
            </div>
            <div style={{
              flex: 1, minHeight: 0,
              background: 'var(--paper)',
              border: '1px solid rgba(255,255,255,.2)',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,.4)',
              position: 'relative',
            }}>
              {state.loading && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
                  color: 'var(--inkSoft)',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div className="jpm-serif-display" style={{ fontSize: 18, fontStyle: 'italic' }}>Chargement du document…</div>
                    <div className="jpm-mono" style={{ fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', marginTop: 10, opacity: .6 }}>loading</div>
                  </div>
                </div>
              )}
              {state.error && !state.loading && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
                  color: 'var(--ink)', padding: 24,
                }}>
                  <div style={{ textAlign: 'center', maxWidth: 520 }}>
                    <div className="jpm-serif-display" style={{ fontSize: 20, fontStyle: 'italic' }}>Impossible d'afficher ce PDF dans le navigateur.</div>
                    <div style={{ fontSize: 14, color: 'var(--inkSoft)', marginTop: 10, fontStyle: 'italic' }}>
                      Le serveur distant ne permet pas l'affichage direct. Vous pouvez l'ouvrir dans un nouvel onglet ou le télécharger.
                    </div>
                    <div style={{ marginTop: 20, display: 'inline-flex', gap: 10 }}>
                      <a href={state.url} target="_blank" rel="noopener" className="jpm-btn">Ouvrir dans un onglet ↗</a>
                      <a href={state.url} download className="jpm-btn ghost">Télécharger ↓</a>
                    </div>
                  </div>
                </div>
              )}
              {state.blobUrl && !state.loading && !state.error && (
                <iframe
                  src={state.blobUrl}
                  title={state.title || 'PDF'}
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              )}
            </div>
          </div>
        )}
      </PdfCtx.Provider>
    );
  }

  function usePdfViewer() {
    const ctx = React.useContext(PdfCtx);
    if (!ctx) return { open: (url) => window.open(url, '_blank'), close: () => {} };
    return ctx;
  }

  // Inject keyframes once
  if (!document.getElementById('jpm-pdf-viewer-keyframes')) {
    const style = document.createElement('style');
    style.id = 'jpm-pdf-viewer-keyframes';
    style.textContent = `
      @keyframes jpmPdfFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  window.jpmPdfProvider = PdfProvider;
  window.jpmUsePdfViewer = usePdfViewer;
})();
