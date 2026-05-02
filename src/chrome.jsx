// Chrome: header, footer, sticky nav.
(function(){
  const { jpmReveal: Reveal } = window;

  function Header({ lang, setLang, theme, setTheme, route, nav }) {
    const D = window.SITE;
    const rFR = lang === 'fr';
    const [seriesOpen, setSeriesOpen] = React.useState(false);
    const seriesRef = React.useRef(null);

    // close dropdown on outside click
    React.useEffect(() => {
      function onDoc(e) {
        if (seriesRef.current && !seriesRef.current.contains(e.target)) setSeriesOpen(false);
      }
      document.addEventListener('click', onDoc);
      return () => document.removeEventListener('click', onDoc);
    }, []);

    const items = [
      { k:'home', fr:'Accueil', en:'Home' },
      { k:'research', fr:'Recherche', en:'Research' },
      { k:'__series', fr:'Séries', en:'Series' },
      { k:'teaching', fr:'Enseignement', en:'Teaching' },
      { k:'cv', fr:'CV', en:'CV' },
      { k:'contact', fr:'Contact', en:'Contact' },
    ];
    const seriesItems = [
      { k:'emv', fr:'Série EMV', en:'EMV series', subFR:'Études du Manuscrit de Voynich', subEN:'Studies on the Voynich Manuscript' },
      { k:'tgse-series', fr:'Série TGSE', en:'TGSE series', subFR:'Théorie Générale des Structures Émergentes', subEN:'General Theory of Emergent Structures' },
      { k:'ora-series', fr:'Série ORA', en:'ORA series', subFR:'Opérateur de Résonance Arithmétique', subEN:'Arithmetic Resonance Operator' },
    ];
    const seriesActive = ['emv','tgse-series','ora-series'].includes(route);
    return (
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'color-mix(in srgb, var(--paper) 92%, transparent)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--rule)',
        padding: '18px 56px', display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', gap: 24,
      }}>
        <a onClick={() => nav('home')} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
          <div className="jpm-mono" style={{ fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <svg width="22" height="11" viewBox="0 0 44 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M2 11 C 2 4, 10 4, 16 8.5 C 20 11.5, 24 11.5, 28 8.5 C 34 4, 42 4, 42 11 C 42 18, 34 18, 28 13.5 C 24 10.5, 20 10.5, 16 13.5 C 10 18, 2 18, 2 11 Z"/>
            </svg>
            Lemniscate
          </div>
          <div className="jpm-serif-display" style={{ fontSize: 22, lineHeight: 1.1, letterSpacing: '.005em' }}>{D.author.name}</div>
          <div className="jpm-mono" style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--inkSoft)', marginTop: 4 }}>
            {rFR ? D.author.roleFR : D.author.roleEN} · {D.author.location}
          </div>
        </a>
        <nav className="jpm-nav" style={{ display: 'flex', gap: 26, fontSize: 14.5, fontStyle: 'italic', alignItems: 'center' }}>
          {items.map(it => {
            if (it.k === '__series') {
              return (
                <div key="__series" ref={seriesRef} style={{ position: 'relative' }}>
                  <a onClick={() => setSeriesOpen(o => !o)}
                    className={seriesActive ? 'active' : ''}
                    style={{ color: 'var(--inkSoft)', cursor: 'pointer', textDecoration: 'none', display:'inline-flex', alignItems:'baseline', gap: 4 }}>
                    {rFR ? it.fr : it.en}
                    <span style={{ fontSize: 9, fontStyle: 'normal', transition: 'transform .2s', transform: seriesOpen ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▾</span>
                  </a>
                  {seriesOpen && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 14px)', right: 0,
                      minWidth: 320, background: 'var(--paper)',
                      border: '1px solid var(--rule)',
                      boxShadow: '0 12px 40px -8px color-mix(in srgb, var(--ink) 22%, transparent)',
                      padding: '8px 0', zIndex: 30,
                    }}>
                      {seriesItems.map(s => (
                        <a key={s.k}
                          onClick={() => { setSeriesOpen(false); nav(s.k); }}
                          className={route === s.k ? 'active' : ''}
                          style={{
                            display:'block', padding: '12px 22px', cursor: 'pointer',
                            color: route === s.k ? 'var(--accent)' : 'var(--ink)',
                            textDecoration: 'none',
                            borderLeft: route === s.k ? '2px solid var(--accent)' : '2px solid transparent',
                          }}
                          onMouseEnter={e => { if (route !== s.k) e.currentTarget.style.background = 'var(--paperAlt)'; }}
                          onMouseLeave={e => { if (route !== s.k) e.currentTarget.style.background = 'transparent'; }}>
                          <div style={{ fontStyle:'italic', fontSize: 15 }}>{rFR ? s.fr : s.en}</div>
                          <div style={{ fontSize: 12, color:'var(--inkSoft)', marginTop: 3, fontStyle:'italic', lineHeight: 1.3 }}>
                            {rFR ? s.subFR : s.subEN}
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a key={it.k} onClick={() => nav(it.k)}
                className={route === it.k ? 'active' : ''}
                style={{ color: 'var(--inkSoft)', cursor: 'pointer', textDecoration: 'none' }}>
                {rFR ? it.fr : it.en}
              </a>
            );
          })}
          <span style={{ width: 1, height: 20, background: 'var(--rule)', margin: '0 6px' }} />
          <button onClick={() => setLang(rFR ? 'en' : 'fr')}
            className="jpm-mono" style={{ background:'transparent', border:'1px solid var(--rule)', color:'var(--inkSoft)', padding:'4px 10px', fontSize:10.5, letterSpacing:'.16em', cursor:'pointer' }}>
            {rFR ? 'EN' : 'FR'}
          </button>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title={theme === 'light' ? (rFR?'Mode sombre':'Dark mode') : (rFR?'Mode clair':'Light mode')}
            style={{ background:'transparent', border:'1px solid var(--rule)', color:'var(--inkSoft)', width:30, height:26, cursor:'pointer', display:'grid', placeItems:'center' }}>
            {theme === 'light'
              ? <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M6 0a6 6 0 0 0 6 8 8 8 0 1 1-6-8"/></svg>
              : <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5 13 13M3 13l1.5-1.5M11.5 4.5 13 3"/></svg>}
          </button>
        </nav>
      </header>
    );
  }

  function Footer({ lang }) {
    const D = window.SITE;
    const rFR = lang === 'fr';
    return (
      <React.Fragment>
      <footer style={{
        borderTop: '1px solid var(--rule)',
        padding: '40px 56px 48px',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 36,
        marginTop: 100,
      }}>
        <div>
          <div className="jpm-mono" style={{ fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <svg width="22" height="11" viewBox="0 0 44 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M2 11 C 2 4, 10 4, 16 8.5 C 20 11.5, 24 11.5, 28 8.5 C 34 4, 42 4, 42 11 C 42 18, 34 18, 28 13.5 C 24 10.5, 20 10.5, 16 13.5 C 10 18, 2 18, 2 11 Z"/>
            </svg>
            Lemniscate
          </div>
          <div className="jpm-serif-display" style={{ fontSize: 18, marginBottom: 6 }}>{D.author.name}</div>
          <div className="jpm-mono" style={{ fontSize: 11, color: 'var(--inkSoft)', letterSpacing: '.08em', lineHeight: 1.8 }}>
            {rFR ? D.author.affilFR : D.author.affilEN}<br/>{D.author.location}
          </div>
        </div>
        <div>
          <div className="jpm-kicker" style={{ marginBottom: 10 }}>Contact</div>
          <a href={`mailto:${D.author.email}`} className="jpm-link" style={{ fontSize: 14 }}>{D.author.email}</a>
        </div>
        <div>
          <div className="jpm-kicker" style={{ marginBottom: 10 }}>{rFR ? 'Profils' : 'Profiles'}</div>
          {D.author.links.map(l => (
            <div key={l.label}><a href={l.href} target="_blank" rel="noopener" className="jpm-link" style={{ fontSize: 14 }}>{l.label}</a></div>
          ))}
        </div>
        <div>
          <div className="jpm-kicker" style={{ marginBottom: 10 }}>ORCID</div>
          <div className="jpm-mono" style={{ fontSize: 12, color: 'var(--inkSoft)' }}>{D.author.orcid}</div>
          <div className="jpm-mono" style={{ fontSize: 10.5, color: 'var(--ruleStrong)', marginTop: 18, letterSpacing: '.1em' }}>
            © MMXXVI · {rFR ? 'Tous droits réservés' : 'All rights reserved'}
          </div>
        </div>
      </footer>
      <div style={{
        borderTop: '1px solid var(--rule)',
        padding: '18px 56px 24px',
        fontSize: 11.5, fontStyle: 'italic',
        color: 'var(--ruleStrong)', textAlign: 'center',
        textWrap: 'pretty', lineHeight: 1.6,
      }}>
        {rFR
          ? <>Photographies des fossiles : <em>Saint-Martin-d'Oney, 2024</em>, par l'auteur. Site conçu et codé par l'auteur, avec l'assistance de Claude (Anthropic), 2025–2026.</>
          : <>Fossil photographs: <em>Saint-Martin-d'Oney, 2024</em>, by the author. Site designed and coded by the author, with the assistance of Claude (Anthropic), 2025–2026.</>}
      </div>
      </React.Fragment>
    );
  }

  window.jpmHeader = Header;
  window.jpmFooter = Footer;
})();
