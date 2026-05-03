// Hide splash once React has mounted, then run KaTeX auto-render and French typography fix.
(function(){
  const splash = document.getElementById('splash');
  const check = () => {
    if (document.getElementById('root').children.length > 0) {
      splash.classList.add('hide');
      setTimeout(() => splash.remove(), 400);
      // typeset math after mount and on route/expand changes
      const typeset = () => {
        if (window.renderMathInElement) {
          try {
            window.renderMathInElement(document.body, {
              delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
              ],
              throwOnError: false,
            });
            // Glue trailing punctuation (. , ; : ) ] !) to the preceding KaTeX span
            // so it never wraps to a new line on its own.
            document.querySelectorAll('.katex').forEach(el => {
              if (el.dataset._glued) return;
              const next = el.nextSibling;
              if (next && next.nodeType === 3) {
                const m = next.nodeValue.match(/^([.,;:!?)\]])/);
                if (m) {
                  const punct = m[1];
                  next.nodeValue = next.nodeValue.slice(1);
                  const glue = document.createElement('span');
                  glue.style.whiteSpace = 'nowrap';
                  el.parentNode.insertBefore(glue, el);
                  glue.appendChild(el);
                  glue.appendChild(document.createTextNode(punct));
                  el.dataset._glued = '1';
                }
              }
            });
          } catch (e) {}
        }
      };
      typeset();
      // Typographie française : insère une espace fine insécable avant : ; ! ? »
      // et après «, uniquement dans le contenu français.
      const NBSP = ' '; // narrow no-break space
      const frTypo = (root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
          acceptNode(n) {
            // skip script/style/katex/mono/code
            let p = n.parentElement;
            while (p) {
              const tag = p.tagName;
              if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE') return NodeFilter.FILTER_REJECT;
              if (p.classList && (p.classList.contains('katex') || p.classList.contains('katex-html') || p.classList.contains('jpm-mono'))) return NodeFilter.FILTER_REJECT;
              p = p.parentElement;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        const nodes = [];
        let n; while ((n = walker.nextNode())) nodes.push(n);
        nodes.forEach(n => {
          const v = n.nodeValue;
          if (!v) return;
          // collapse any whitespace before : ; ! ? » to a NBSP (but leave URLs alone: skip if preceded by letter+colon like http:)
          let out = v
            .replace(/[   ]+([:;!?»])/g, NBSP + '$1')
            .replace(/(«)[   ]+/g, '$1' + NBSP);
          // avoid touching URL-like "http://" "doi:" patterns by restoring them
          out = out.replace(/(https?) :/g, '$1:').replace(/(doi) :/gi, '$1:').replace(/(isbn) :/gi, '$1:');
          if (out !== v) n.nodeValue = out;
        });
      };
      frTypo(document.getElementById('root'));
      // re-typeset whenever the DOM changes (abstract expand, route change)
      const mo = new MutationObserver(() => {
        clearTimeout(window.__mjTimer);
        window.__mjTimer = setTimeout(() => { typeset(); frTypo(document.getElementById('root')); }, 80);
      });
      mo.observe(document.getElementById('root'), { childList: true, subtree: true });
    } else setTimeout(check, 120);
  };
  check();
})();
