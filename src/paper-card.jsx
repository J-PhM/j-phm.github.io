// Shared PaperCard — used by all series pages (EMV, TGSE, ORA).
// Large bordered card with kicker, title, DOI, collapsible abstract, tags, action buttons.
(function(){
  const { jpmReveal: Reveal } = window;

  // Convert simple inline math like "T^K" or "x^2" into <sup>-rendered React nodes.
  function renderInlineMath(text) {
    const out = [];
    const re = /([A-Za-z])\^([A-Za-z0-9]+)/g;
    let last = 0, m, key = 0;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) out.push(text.slice(last, m.index));
      out.push(<React.Fragment key={key++}>{m[1]}<sup>{m[2]}</sup></React.Fragment>);
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
  }

  function PaperCard({ p, rFR, seriesLabel, forceOpen, toggleToken }) {
    const pdf = window.jpmUsePdfViewer();
    const [localOpen, setLocalOpen] = React.useState(true);
    // Re-sync with forceOpen whenever the parent bumps toggleToken.
    React.useEffect(() => {
      if (forceOpen !== undefined) setLocalOpen(forceOpen);
    }, [toggleToken, forceOpen]);
    const open = localOpen;
    const setOpen = setLocalOpen;
    const abs = p.abstract && (rFR ? p.abstract.fr : p.abstract.en);
    const title = (!rFR && p.titleEn) ? p.titleEn : p.title;

    return (
      <Reveal>
        <article
          id={p.doi ? `paper-${p.doi.replace(/[^a-z0-9]/gi,'-')}` : undefined}
          style={{
          border: '1px solid var(--rule)', padding: '28px 32px',
          background: 'var(--paperAlt)', marginBottom: 16,
          filter: p.supersededBy ? 'grayscale(1) opacity(0.55)' : 'none',
          transition: 'filter .2s',
        }}
          onMouseEnter={p.supersededBy ? e => { e.currentTarget.style.filter = 'none'; } : undefined}
          onMouseLeave={p.supersededBy ? e => { e.currentTarget.style.filter = 'grayscale(1) opacity(0.55)'; } : undefined}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start',
          }}>
            <div>
              <div className="jpm-mono" style={{ fontSize: 10.5, letterSpacing: '.16em', color: 'var(--accent)', textTransform:'uppercase', marginBottom: 8, display:'flex', gap: 10, flexWrap:'wrap', alignItems:'center' }}>
                {p.track === 'v2' && (
                  <span style={{ padding: '2px 7px', background:'var(--accent)', color:'var(--paper)', letterSpacing:'.2em' }}>v2</span>
                )}
                <span>{p.short || seriesLabel} · {p.year}{p.month ? '.' + String(p.month).padStart(2,'0') : ''}{p.version ? ` · v${p.version}` : ''}</span>
                {p.langs && p.langs.length > 0 && (
                  <span style={{ color:'var(--ruleStrong)', letterSpacing:'.14em' }}>· {p.langs.join(' · ')}</span>
                )}
              </div>
              <div className="jpm-serif-display" style={{ fontSize: 22, lineHeight: 1.3, textWrap: 'balance' }}>
                {title}
              </div>

              <div className="jpm-mono" style={{ fontSize: 11, color: 'var(--inkSoft)', marginTop: 10 }}>
                doi:{p.doi}
              </div>

              {(p.msc?.length || p.tags?.length) > 0 && (
                <div style={{ marginTop: 10, display:'flex', gap: 6, flexWrap:'wrap' }}>
                  {(p.msc || []).map(code => (
                    <span key={'m'+code} className="jpm-mono" style={{
                      fontSize: 9.5, letterSpacing:'.06em',
                      padding: '2px 7px', border:'1px solid var(--rule)',
                      color:'var(--inkSoft)', borderRadius: 2, background:'var(--paper)',
                    }}>MSC {code}</span>
                  ))}
                  {(p.tags || []).map(tag => (
                    <span key={'t'+tag} style={{
                      fontSize: 10.5, fontStyle:'italic',
                      padding: '2px 7px', border:'1px solid var(--rule)',
                      color:'var(--inkSoft)', borderRadius: 2, background:'var(--paper)',
                    }}>{tag}</span>
                  ))}
                </div>
              )}

              {p.supersededBy ? (
                <div style={{ marginTop: 10, fontSize: 12.5, color: 'var(--inkSoft)', fontStyle:'italic' }}>
                  → {rFR ? 'Version 2 publiée :' : 'Version 2 published:'}{' '}
                  <a href={`#paper-${p.supersededBy.doi.replace(/[^a-z0-9]/gi,'-')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = `paper-${p.supersededBy.doi.replace(/[^a-z0-9]/gi,'-')}`;
                      const el = document.getElementById(id);
                      if (el) {
                        const y = el.getBoundingClientRect().top + window.scrollY - 90;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                        el.style.transition = 'background .3s';
                        el.style.background = 'var(--paper)';
                        setTimeout(() => { el.style.background = 'var(--paperAlt)'; }, 1200);
                      }
                    }}
                    style={{ color:'var(--accent)', textDecoration:'underline', cursor:'pointer' }}>
                    {p.supersededBy.short}
                  </a>
                </div>
              ) : p.series === 'tgse' && p.track === 'v1' && (
                <div style={{ marginTop: 10, fontSize: 12, color: 'var(--inkSoft)', fontStyle:'italic', opacity: .8 }}>
                  — {rFR ? 'Ce travail sera révisé dans la v2.' : 'This work will be revised in v2.'}
                </div>
              )}

              {abs && (
                <div style={{ marginTop: 14 }}>
                  <button
                    onClick={() => setOpen(o => !o)}
                    style={{
                      background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                      color: 'var(--accent)', fontFamily: 'inherit', fontSize: 12.5,
                      fontStyle: 'italic', letterSpacing: '.02em',
                      display:'inline-flex', alignItems:'center', gap: 6,
                    }}>
                    <span style={{
                      display:'inline-block', width: 8,
                      transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease',
                    }}>▸</span>
                    {open ? (rFR ? 'masquer le résumé' : 'hide summary') : (rFR ? 'lire le résumé' : 'read summary')}
                  </button>
                  {open && (
                    <div style={{
                      marginTop: 14, paddingLeft: 18, borderLeft: '2px solid var(--accent)',
                      maxWidth: 760,
                    }}>
                      {abs.split('\n\n').map((para, pi) => (
                        <p key={pi} className="jpm-serif-display" style={{
                          fontSize: 15.5, lineHeight: 1.65, color: 'var(--ink)',
                          fontStyle:'italic', margin: pi === 0 ? 0 : '14px 0 0', textWrap:'pretty',
                        }}>
                          {renderInlineMath(para)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
              {p.pdf && <button onClick={() => pdf.open(p.pdf, p.title)} className="jpm-btn" style={{ fontFamily: 'inherit', cursor: 'pointer' }}>{rFR ? 'Lire' : 'Read'}</button>}
              {p.pdf && <a href={p.pdf} download className="jpm-btn ghost">{rFR ? 'Télécharger ↓' : 'Download ↓'}</a>}
              {p.doi && <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener" className="jpm-btn ghost">Zenodo ↗</a>}
              {p.rg && <a href={p.rg} target="_blank" rel="noopener" className="jpm-btn ghost">ResearchGate ↗</a>}
            </div>
          </div>
        </article>
      </Reveal>
    );
  }

  window.jpmPaperCard = PaperCard;

  // Global "expand/collapse all abstracts" toggle button for series pages.
  // Controls all PaperCards by passing `forceOpen` down.
  function AbstractsToggle({ open, onToggle, rFR }) {
    return (
      <button
        onClick={onToggle}
        className="jpm-mono"
        style={{
          fontSize: 10.5, letterSpacing:'.16em', textTransform:'uppercase',
          padding: '8px 14px', border: '1px solid var(--rule)',
          background: 'transparent', color: 'var(--inkSoft)',
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'all .18s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.color = 'var(--inkSoft)'; }}
      >
        {open
          ? (rFR ? '— Masquer tous les résumés' : '— Hide all summaries')
          : (rFR ? '+ Afficher tous les résumés' : '+ Show all summaries')}
      </button>
    );
  }
  window.jpmAbstractsToggle = AbstractsToggle;
})();
