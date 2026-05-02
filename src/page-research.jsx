// Research page — searchable, filterable paper index grouped by series.
(function(){
  const { jpmReveal: Reveal, jpmPageHero: PageHero } = window;

  function Research({ lang, nav }) {
    const D = window.SITE;
    const rFR = lang === 'fr';
    const [query, setQuery] = React.useState('');
    const [series, setSeries] = React.useState('all');
    const [sort, setSort] = React.useState('series');
    const [allOpen, setAllOpen] = React.useState(false);
    const [token, setToken] = React.useState(0);
    const toggleAll = () => { setAllOpen(o => !o); setToken(t => t+1); };
    const Toggle = window.jpmAbstractsToggle;

    const seriesOrder = Object.entries(D.series).sort((a,b) => a[1].order - b[1].order);
    const counts = D.papers.reduce((acc, p) => { acc[p.series] = (acc[p.series]||0)+1; return acc; }, {});

    const filtered = React.useMemo(() => {
      let list = D.papers.slice();
      if (series !== 'all') list = list.filter(p => p.series === series);
      const q = query.trim().toLowerCase();
      if (q) list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.titleEn||'').toLowerCase().includes(q) ||
        (p.doi||'').toLowerCase().includes(q) ||
        (p.short||'').toLowerCase().includes(q) ||
        (D.series[p.series]?.fr || '').toLowerCase().includes(q) ||
        (D.series[p.series]?.en || '').toLowerCase().includes(q)
      );
      if (sort === 'series') {
        // Logical order: by series (seriesOrder) → within series v2 first then v1 → by ord ascending
        const sOrd = Object.fromEntries(Object.entries(D.series).map(([k,v]) => [k, v.order]));
        list.sort((a,b) =>
          (sOrd[a.series]||99) - (sOrd[b.series]||99)
          || ((a.track==='v2'?0:1) - (b.track==='v2'?0:1))
          || ((a.ord||99) - (b.ord||99))
        );
      }
      else if (sort === 'recent') list.sort((a,b) => (b.year - a.year) || ((b.month||0)-(a.month||0)));
      else if (sort === 'oldest') list.sort((a,b) => (a.year - b.year) || ((a.month||0)-(b.month||0)));
      else if (sort === 'az') list.sort((a,b) => a.title.localeCompare(b.title));
      return list;
    }, [D.papers, series, sort, query]);

    return (
      <main>
        <PageHero fossil="public/fossils/recherche.jpg">
          <Reveal>
            <div className="jpm-kicker">{rFR ? 'Recherche' : 'Research'}</div>
            <h1 className="jpm-serif-display" style={{ fontSize: 56, margin: '12px 0 8px', fontWeight: 400, letterSpacing: '-.01em' }}>
              Articles <em style={{ fontStyle:'italic', color:'var(--accent)' }}>&amp;</em> publications
            </h1>
            <p style={{ maxWidth: 640, color: 'var(--inkSoft)', fontStyle: 'italic', fontSize: 17 }}>
              {rFR
                ? <>Ensemble des travaux déposés en accès libre — principalement sur <a className="jpm-link" href="https://zenodo.org" target="_blank" rel="noopener">Zenodo</a>. Filtrer par série, trier, ou rechercher par titre, DOI ou mot-clé.</>
                : <>All works deposited open-access — mainly on <a className="jpm-link" href="https://zenodo.org" target="_blank" rel="noopener">Zenodo</a>. Filter by series, sort, or search by title, DOI or keyword.</>}
            </p>
          </Reveal>
        </PageHero>

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 56px 20px' }}>

        {/* CONTROLS */}
        <div style={{ marginTop: 44, paddingBottom: 18, borderBottom: '1px solid var(--rule)' }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 18 }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <label className="jpm-kicker" style={{ display:'block', marginBottom: 4 }}>{rFR ? 'Rechercher' : 'Search'}</label>
              <div style={{ position:'relative' }}>
                <input className="jpm-input" value={query} onChange={e => setQuery(e.target.value)}
                  placeholder={rFR ? 'titre, DOI, mot-clé…' : 'title, DOI, keyword…'} />
                <span style={{ position:'absolute', right: 0, bottom: 10, color: 'var(--ruleStrong)', fontSize: 13 }}>
                  {filtered.length} / {D.papers.length}
                </span>
              </div>
            </div>
            <div>
              <label className="jpm-kicker" style={{ display:'block', marginBottom: 8 }}>{rFR ? 'Tri' : 'Sort'}</label>
              <div style={{ display:'flex', gap: 6 }}>
                {[['series', rFR?'Série':'Series'], ['recent', rFR?'Récents':'Newest'], ['oldest', rFR?'Anciens':'Oldest'], ['az', 'A → Z']].map(([k,l]) => (
                  <button key={k} onClick={() => setSort(k)} className={`jpm-tag ${sort===k?'active':''}`}>{l}</button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 12, flexWrap:'wrap', marginBottom: 8 }}>
              <label className="jpm-kicker" style={{ display:'block', margin: 0 }}>{rFR ? 'Série' : 'Series'}</label>
              {filtered.some(p => p.abstract) && <Toggle open={allOpen} onToggle={toggleAll} rFR={rFR} />}
            </div>
            <div style={{ display:'flex', gap: 6, flexWrap: 'wrap' }}>
              <button onClick={() => setSeries('all')} className={`jpm-tag ${series==='all'?'active':''}`}>
                {rFR ? 'Toutes' : 'All'} <span style={{opacity:.6}}>· {D.papers.length}</span>
              </button>
              {seriesOrder.map(([k,v]) => (
                <button key={k} onClick={() => setSeries(k)} className={`jpm-tag ${series===k?'active':''}`}>
                  {rFR ? v.fr : v.en} <span style={{opacity:.6}}>· {counts[k]||0}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS grouped by series (when 'all' AND sort='series') */}
        <div style={{ paddingTop: 8 }}>
          {series === 'all' && sort === 'series' ? (
            seriesOrder.map(([k,v]) => {
              const group = filtered.filter(p => p.series === k);
              if (!group.length) return null;
              // TGSE: split by track (v2 first, v1 second)
              if (k === 'tgse') {
                const v2 = group.filter(p => p.track === 'v2');
                const v1 = group.filter(p => p.track !== 'v2');
                return (
                  <section key={k} style={{ marginTop: 48 }}>
                    <Reveal>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 16 }}>
                        <h2 className="jpm-serif-display" style={{ fontSize: 26, margin: 0, fontWeight: 400, fontStyle: 'italic' }}>
                          {rFR ? v.fr : v.en}
                        </h2>
                        <div className="jpm-mono" style={{ fontSize: 11, color: 'var(--ruleStrong)', letterSpacing:'.14em' }}>
                          {group.length} {rFR?'articles':'papers'}
                        </div>
                      </div>
                    </Reveal>
                    {v2.length > 0 && (
                      <>
                        <Reveal>
                          <div style={{ marginTop: 24, marginBottom: 12, display:'flex', alignItems:'center', gap: 12 }}>
                            <span className="jpm-mono" style={{
                              fontSize: 10, letterSpacing:'.2em', padding: '4px 10px',
                              background:'var(--accent)', color:'var(--paper)', textTransform:'uppercase',
                            }}>v2 · {rFR?'chantier actif':'active work'}</span>
                            <span style={{ fontSize: 13, color:'var(--inkSoft)', fontStyle:'italic' }}>
                              {rFR ? 'En cours de rédaction — remplace progressivement la v1.' : 'Work in progress — progressively replacing v1.'}
                            </span>
                          </div>
                        </Reveal>
                        <PaperList papers={v2} rFR={rFR} D={D} forceOpen={allOpen} toggleToken={token} />
                      </>
                    )}
                    {v1.length > 0 && (
                      <>
                        <Reveal>
                          <div style={{ marginTop: 40, marginBottom: 12, display:'flex', alignItems:'center', gap: 12 }}>
                            <span className="jpm-mono" style={{
                              fontSize: 10, letterSpacing:'.2em', padding: '4px 10px',
                              border:'1px solid var(--ruleStrong)', color:'var(--ruleStrong)', textTransform:'uppercase',
                            }}>v1 · {rFR?'série initiale':'initial series'}</span>
                            <span style={{ fontSize: 13, color:'var(--inkSoft)', fontStyle:'italic' }}>
                              {rFR ? 'Sera révisée dans la v2.' : 'To be revised in v2.'}
                            </span>
                          </div>
                        </Reveal>
                        <PaperList papers={v1} rFR={rFR} D={D} forceOpen={allOpen} toggleToken={token} />
                      </>
                    )}
                  </section>
                );
              }
              return (
                <section key={k} style={{ marginTop: 48 }}>
                  <Reveal>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 16 }}>
                      <h2 className="jpm-serif-display" style={{ fontSize: 26, margin: 0, fontWeight: 400, fontStyle: 'italic' }}>
                        {rFR ? v.fr : v.en}
                      </h2>
                      <div className="jpm-mono" style={{ fontSize: 11, color: 'var(--ruleStrong)', letterSpacing:'.14em' }}>
                        {group.length} {group.length > 1 ? (rFR?'articles':'papers') : (rFR?'article':'paper')}
                      </div>
                    </div>
                  </Reveal>
                  <PaperList papers={group} rFR={rFR} D={D} forceOpen={allOpen} toggleToken={token} />
                </section>
              );
            })
          ) : (
            <section style={{ marginTop: 32 }}>
              {series === 'tgse' && sort === 'series' ? (
                (() => {
                  const v2 = filtered.filter(p => p.track === 'v2');
                  const v1 = filtered.filter(p => p.track !== 'v2');
                  return (
                    <>
                      {v2.length > 0 && (
                        <>
                          <div style={{ marginBottom: 12, display:'flex', alignItems:'center', gap: 12 }}>
                            <span className="jpm-mono" style={{ fontSize: 10, letterSpacing:'.2em', padding: '4px 10px', background:'var(--accent)', color:'var(--paper)', textTransform:'uppercase' }}>v2 · {rFR?'chantier actif':'active work'}</span>
                            <span style={{ fontSize: 13, color:'var(--inkSoft)', fontStyle:'italic' }}>{rFR?'En cours de rédaction.':'Work in progress.'}</span>
                          </div>
                          <PaperList papers={v2} rFR={rFR} D={D} forceOpen={allOpen} toggleToken={token} />
                        </>
                      )}
                      {v1.length > 0 && (
                        <>
                          <div style={{ marginTop: 40, marginBottom: 12, display:'flex', alignItems:'center', gap: 12 }}>
                            <span className="jpm-mono" style={{ fontSize: 10, letterSpacing:'.2em', padding: '4px 10px', border:'1px solid var(--ruleStrong)', color:'var(--ruleStrong)', textTransform:'uppercase' }}>v1 · {rFR?'série initiale':'initial series'}</span>
                            <span style={{ fontSize: 13, color:'var(--inkSoft)', fontStyle:'italic' }}>{rFR?'Sera révisée dans la v2.':'To be revised in v2.'}</span>
                          </div>
                          <PaperList papers={v1} rFR={rFR} D={D} forceOpen={allOpen} toggleToken={token} />
                        </>
                      )}
                    </>
                  );
                })()
              ) : (
                <PaperList papers={filtered} rFR={rFR} D={D} forceOpen={allOpen} toggleToken={token} />
              )}
            </section>
          )}
          {filtered.length === 0 && (
            <div style={{ padding: 80, textAlign: 'center', color: 'var(--inkSoft)', fontStyle: 'italic' }}>
              {rFR ? 'Aucun article ne correspond.' : 'No paper matches.'}
            </div>
          )}
        </div>
        </div>
      </main>
    );
  }

  function PaperList({ papers, rFR, D, forceOpen, toggleToken }) {
    const pdf = window.jpmUsePdfViewer();
    const [open, setOpen] = React.useState({});
    const toggle = (key) => setOpen(o => ({ ...o, [key]: !o[key] }));
    // Sync all papers to forceOpen when toggleToken bumps.
    React.useEffect(() => {
      if (forceOpen === undefined) return;
      const next = {};
      papers.forEach(p => {
        const k = p.doi || p.title;
        next[k] = forceOpen;
      });
      setOpen(next);
    }, [toggleToken]);
    return (
      <ol style={{ listStyle:'none', padding:0, margin:0 }}>
        {papers.map((p, i) => {
          const url = p.pdf || p.url || (p.doi ? `https://doi.org/${p.doi}` : '#');
          const isLocal = !!p.pdf;
          const key = p.doi || p.title;
          const abs = p.abstract && (rFR ? p.abstract.fr : p.abstract.en);
          const isOpen = !!open[key];
          return (
            <Reveal key={key} delay={i*40} as="li">
              <div style={{
                display:'grid', gridTemplateColumns:'80px 1fr auto', gap: 24, alignItems: 'baseline',
                padding: '18px 0', borderBottom: '1px dotted var(--rule)',
              }}>
                <div className="jpm-mono" style={{ fontSize: 12, color: 'var(--ruleStrong)', letterSpacing:'.08em' }}>
                  {p.year}{p.month ? '.' + String(p.month).padStart(2,'0') : ''}
                </div>
                <div>
                  <a href={url} target="_blank" rel="noopener" className="jpm-serif-display"
                    onClick={p.pdf ? (e) => { e.preventDefault(); pdf.open(p.pdf, (!rFR && p.titleEn) ? p.titleEn : p.title); } : undefined}
                    style={{ fontSize: 18, lineHeight: 1.35, textDecoration: 'none', color:'var(--ink)', textWrap:'balance', display:'block', cursor: 'pointer' }}
                    onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                    onMouseLeave={e=>e.currentTarget.style.color='var(--ink)'}>
                    {(!rFR && p.titleEn) ? p.titleEn : p.title}
                  </a>
                  <div style={{ display:'flex', gap: 14, marginTop: 8, fontSize: 12, color: 'var(--inkSoft)', flexWrap:'wrap', alignItems:'center' }}>
                    {p.track === 'v2' && (
                      <span className="jpm-mono" style={{ fontSize: 9.5, letterSpacing:'.2em', padding: '2px 7px', background:'var(--accent)', color:'var(--paper)', textTransform:'uppercase' }}>v2</span>
                    )}
                    {p.short && <span className="jpm-mono" style={{ letterSpacing:'.1em', color: 'var(--accent)', textTransform:'uppercase', fontSize:10.5 }}>{p.short}</span>}
                    {p.short && p.doi && <span style={{ color: 'var(--rule)' }}>·</span>}
                    {p.doi && <span className="jpm-mono" style={{ fontSize:11 }}>doi:{p.doi}</span>}
                    {p.type && <><span style={{ color: 'var(--rule)' }}>·</span><span style={{ fontStyle:'italic' }}>{p.type}</span></>}
                    {p.langs && p.langs.length > 0 && (
                      <><span style={{ color: 'var(--rule)' }}>·</span>
                      <span className="jpm-mono" style={{ fontSize: 10, letterSpacing:'.14em', color: 'var(--ruleStrong)' }}>
                        {p.langs.join(' · ')}
                      </span></>
                    )}
                    {p.overhaul && <><span style={{ color: 'var(--rule)' }}>·</span><span style={{ fontStyle:'italic', color:'var(--accent)' }}>{rFR?'refonte complète':'complete overhaul'}</span></>}
                    {abs && (
                      <>
                        <span style={{ color: 'var(--rule)' }}>·</span>
                        <button
                          onClick={() => toggle(key)}
                          style={{
                            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                            color: 'var(--accent)', fontFamily: 'inherit', fontSize: 12,
                            fontStyle: 'italic', letterSpacing: '.02em',
                            display:'inline-flex', alignItems:'center', gap: 6,
                          }}>
                          <span style={{
                            display:'inline-block', width: 8,
                            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 200ms ease',
                          }}>▸</span>
                          {isOpen ? (rFR ? 'masquer le résumé' : 'hide summary') : (rFR ? 'lire le résumé' : 'read summary')}
                        </button>
                      </>
                    )}
                  </div>
                  {(p.msc?.length || p.tags?.length) > 0 && (
                    <div style={{ marginTop: 8, display:'flex', gap: 6, flexWrap:'wrap' }}>
                      {(p.msc || []).map(code => (
                        <span key={'m'+code} className="jpm-mono" style={{
                          fontSize: 9.5, letterSpacing:'.06em',
                          padding: '2px 7px', border:'1px solid var(--rule)',
                          color:'var(--inkSoft)', borderRadius: 2,
                        }}>MSC {code}</span>
                      ))}
                      {(p.tags || []).map(tag => (
                        <span key={'t'+tag} style={{
                          fontSize: 10.5, fontStyle:'italic',
                          padding: '2px 7px', border:'1px solid var(--rule)',
                          color:'var(--inkSoft)', borderRadius: 2,
                        }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  {p.supersededBy ? (
                    <div style={{ marginTop: 6, fontSize: 12, color: 'var(--inkSoft)', fontStyle:'italic' }}>
                      → {rFR ? 'Version révisée :' : 'Revised version:'}{' '}
                      <a href={`https://doi.org/${p.supersededBy.doi}`} target="_blank" rel="noopener"
                        style={{ color:'var(--accent)', textDecoration:'underline' }}>
                        {p.supersededBy.short}
                      </a>
                    </div>
                  ) : p.series === 'tgse' && p.track === 'v1' && (
                    <div style={{ marginTop: 6, fontSize: 12, color: 'var(--inkSoft)', fontStyle:'italic', opacity: .8 }}>
                      — {rFR ? 'Ce travail sera révisé dans la v2.' : 'This work will be revised in v2.'}
                    </div>
                  )}
                  {abs && isOpen && (
                    <div style={{
                      marginTop: 16, paddingLeft: 18, borderLeft: '2px solid var(--accent)',
                      maxWidth: 680,
                    }}>
                      {abs.split('\n\n').map((para, pi) => (
                        <p key={pi} className="jpm-serif-display" style={{
                          fontSize: 15.5, lineHeight: 1.65, color: 'var(--ink)',
                          fontStyle:'italic', margin: pi === 0 ? 0 : '14px 0 0', textWrap:'pretty',
                        }}>
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ display:'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {p.pdf && (
                    <button onClick={() => pdf.open(p.pdf, (!rFR && p.titleEn) ? p.titleEn : p.title)} className="jpm-btn" style={{ fontSize: 10, fontFamily: 'inherit', cursor: 'pointer' }}>
                      {rFR ? 'Lire' : 'Read'}
                    </button>
                  )}
                  {p.pdf && (
                    <a href={p.pdf} download className="jpm-btn ghost" style={{ fontSize: 10 }}>
                      {rFR ? 'Télécharger ↓' : 'Download ↓'}
                    </a>
                  )}
                  {p.doi && (
                    <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener" className="jpm-btn ghost" style={{ fontSize: 10 }}>
                      Zenodo ↗
                    </a>
                  )}
                  {p.rg && (
                    <a href={p.rg} target="_blank" rel="noopener" className="jpm-btn ghost" style={{ fontSize: 10 }}>
                      ResearchGate ↗
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    );
  }

  window.jpmResearch = Research;
})();
