// Shared styles, icons and small UI primitives for the site.
(function(){
  const palette = {
    paper: '#faf6ee', paperAlt: '#f2ecde',
    ink: '#1a1815', inkSoft: '#4a4238',
    rule: '#d8cfbc', ruleStrong: '#8a7b5e',
    accent: '#7a1f15',
    // dark
    dpaper: '#15120d', dpaperAlt: '#1e1a12',
    dink: '#f3ead6', dinkSoft: '#b9ad90',
    drule: '#3a3326', drule2: '#5a4e3a',
    daccent: '#d67b6a',
  };

  function useTheme() {
    const [theme, setTheme] = React.useState(() => localStorage.getItem('jpm-theme') || 'light');
    React.useEffect(() => {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem('jpm-theme', theme);
    }, [theme]);
    return [theme, setTheme];
  }
  function useLang() {
    const [lang, setLang] = React.useState(() => localStorage.getItem('jpm-lang') || 'fr');
    React.useEffect(() => { localStorage.setItem('jpm-lang', lang); }, [lang]);
    return [lang, setLang];
  }
  function useRoute() {
    const parse = () => {
      const path = location.pathname.replace(/^\/+|\/+$/g, '');
      return path || 'home';
    };
    const [route, setRouteState] = React.useState(parse);
    React.useEffect(() => {
      const on = () => setRouteState(parse());
      window.addEventListener('popstate', on);
      window.addEventListener('jpmnav', on);
      return () => {
        window.removeEventListener('popstate', on);
        window.removeEventListener('jpmnav', on);
      };
    }, []);
    const nav = (r) => {
      const path = (!r || r === 'home') ? '/' : '/' + r;
      if (location.pathname !== path) {
        history.pushState({}, '', path);
        window.dispatchEvent(new Event('jpmnav'));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return [route, nav];
  }

  // Inject global CSS (theme vars + base styles + subtle animations)
  function injectCSS() {
    if (document.getElementById('jpm-css')) return;
    const css = `
      :root {
        --paper: ${palette.paper}; --paperAlt: ${palette.paperAlt};
        --ink: ${palette.ink}; --inkSoft: ${palette.inkSoft};
        --rule: ${palette.rule}; --ruleStrong: ${palette.ruleStrong};
        --accent: ${palette.accent};
      }
      html[data-theme="dark"] {
        --paper: ${palette.dpaper}; --paperAlt: ${palette.dpaperAlt};
        --ink: ${palette.dink}; --inkSoft: ${palette.dinkSoft};
        --rule: ${palette.drule}; --ruleStrong: ${palette.drule2};
        --accent: ${palette.daccent};
      }
      html, body { margin:0; padding:0; background:var(--paper); color:var(--ink); }
      body {
        font-family: "EB Garamond", "Garamond", Georgia, serif;
        font-size: 17px; line-height: 1.6;
        transition: background .25s ease, color .25s ease;
      }
      * { box-sizing: border-box; }
      a { color: inherit; }
      ::selection { background: var(--accent); color: var(--paper); }

      .jpm-serif-display { font-family: "Cormorant Garamond", "EB Garamond", serif; font-weight: 400; }
      .jpm-mono { font-family: "IBM Plex Mono", ui-monospace, monospace; }

      .jpm-link {
        color: var(--ink); text-decoration: none;
        border-bottom: 1px solid var(--rule);
        transition: border-color .15s, color .15s;
      }
      .jpm-link:hover { border-bottom-color: var(--accent); color: var(--accent); }

      .jpm-fadein { animation: jpmFade .55s cubic-bezier(.22,.61,.36,1) both; }
      .jpm-fadein-2 { animation: jpmFade .55s .08s cubic-bezier(.22,.61,.36,1) both; }
      .jpm-fadein-3 { animation: jpmFade .55s .16s cubic-bezier(.22,.61,.36,1) both; }
      @keyframes jpmFade { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: none; } }

      .jpm-kicker {
        font-family: "IBM Plex Mono", monospace; font-size: 11px;
        letter-spacing: .22em; text-transform: uppercase;
        color: var(--ruleStrong);
      }

      /* Portrait & Fossil hero */
      .jpm-portrait .jpm-portrait-img {
        transition: filter .6s ease;
      }
      .jpm-portrait:hover .jpm-portrait-img {
        filter: saturate(1.05) contrast(1.02) !important;
      }
      .jpm-fossil-img {
        transition: filter .6s ease, transform .8s ease;
      }
      .jpm-portrait:hover .jpm-fossil-img {
        filter: brightness(1.06) contrast(1.04) !important;
        transform: scale(1.015);
      }
      @media (max-width: 1100px) {
        .jpm-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .jpm-portrait { width: min(440px, 100%) !important; height: auto !important; aspect-ratio: 1/1; justify-self: start !important; }
        .jpm-portrait .jpm-fossil-img { height: auto !important; aspect-ratio: 1/1; }
      }

      /* Reveal on scroll */
      .jpm-reveal { opacity:0; transform: translateY(14px); transition: opacity .7s, transform .7s; }
      .jpm-reveal.is-in { opacity:1; transform:none; }

      /* Nav active */
      .jpm-nav a.active { color: var(--ink); }
      .jpm-nav a.active::after {
        content:''; display:block; height:1px; background: var(--accent);
        margin-top: 2px;
      }

      /* Tag pills */
      .jpm-tag {
        font-family: "IBM Plex Mono", monospace; font-size: 10.5px;
        letter-spacing: .08em; padding: 3px 8px;
        border: 1px solid var(--rule); background: var(--paperAlt);
        color: var(--inkSoft); cursor: pointer;
        transition: all .15s;
      }
      .jpm-tag:hover { border-color: var(--accent); color: var(--accent); }
      .jpm-tag.active { border-color: var(--ink); background: var(--ink); color: var(--paper); }

      /* Buttons */
      .jpm-btn {
        font-family: "IBM Plex Mono", monospace; font-size: 11px;
        letter-spacing: .16em; text-transform: uppercase;
        padding: 7px 14px; background: transparent;
        border: 1px solid var(--accent); color: var(--accent);
        cursor: pointer; text-decoration: none; display: inline-block;
        transition: all .15s;
      }
      .jpm-btn:hover { background: var(--accent); color: var(--paper); }
      .jpm-btn.ghost { border-color: var(--rule); color: var(--inkSoft); }
      .jpm-btn.ghost:hover { border-color: var(--ink); background: transparent; color: var(--ink); }

      /* Inputs */
      .jpm-input {
        font-family: inherit; font-size: 15px;
        background: transparent; border: none;
        border-bottom: 1px solid var(--rule);
        padding: 8px 2px; color: var(--ink); width: 100%;
        outline: none; transition: border-color .15s;
      }
      .jpm-input:focus { border-bottom-color: var(--accent); }
      .jpm-input::placeholder { color: var(--ruleStrong); font-style: italic; }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 10px; height: 10px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: var(--rule); border-radius: 5px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--ruleStrong); }
    `;
    const s = document.createElement('style'); s.id = 'jpm-css'; s.textContent = css; document.head.appendChild(s);
  }
  injectCSS();

  function Reveal({ children, delay = 0, as: Tag = 'div', ...rest }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const el = ref.current; if (!el) return;
      const io = new IntersectionObserver((ents) => {
        for (const e of ents) if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('is-in'), delay);
          io.unobserve(e.target);
        }
      }, { threshold: 0.15 });
      io.observe(el);
      return () => io.disconnect();
    }, [delay]);
    return <Tag ref={ref} className="jpm-reveal" {...rest}>{children}</Tag>;
  }

  // Fossil card — reused as the hero image on every page (except CV which keeps the portrait).
  // Identical visual language to the home portrait: cream paper frame, dark-tinted photo,
  // bottom cartouche in mono caps. Caption defaults to "Fossile — Saint-Martin-d'Oney, 2024".
  function FossilHero({ src, alt = '', size = 440 }) {
    return (
      <figure className="jpm-fadein-3 jpm-portrait" style={{
        margin: 0, width: size, height: size, justifySelf: 'end',
        flexShrink: 0,
      }}>
        <img src={src} alt={alt}
          className="jpm-fossil-img"
          style={{
            display: 'block', width: '100%', height: '100%',
            objectFit: 'cover', filter: 'saturate(.95)',
          }} />
      </figure>
    );
  }

  // PageHero — wraps a page header in the same two-column grid as the home page.
  // Left column: kicker + h1 + intro paragraph(s). Right column: a fossil card.
  // Use this to reproduce the home layout on every other page.
  function PageHero({ fossil, alt, children, padding = '70px 56px 0', fossilSize = 440 }) {
    return (
      <section style={{ padding, maxWidth: 1180, margin: '0 auto' }}>
        <div className="jpm-hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: `minmax(0, 1fr) ${fossilSize}px`,
          gap: 56, alignItems: 'start',
        }}>
          <div>{children}</div>
          <FossilHero src={fossil} alt={alt} size={fossilSize} />
        </div>
      </section>
    );
  }

  Object.assign(window, { jpmUseTheme: useTheme, jpmUseLang: useLang, jpmUseRoute: useRoute, jpmReveal: Reveal, jpmFossilHero: FossilHero, jpmPageHero: PageHero });
})();
