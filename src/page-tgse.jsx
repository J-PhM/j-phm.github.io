// TGSE — dedicated thematic page.
(function(){
  const { jpmReveal: Reveal, jpmPageHero: PageHero } = window;

  function TGSE({ lang, nav }) {
    const D = window.SITE;
    const rFR = lang === 'fr';
    const tgsePapers = D.papers.filter(p => p.series === 'tgse');
    const byOrd = (a,b) => (a.ord||0) - (b.ord||0);
    const v2 = tgsePapers.filter(p => p.track === 'v2').sort(byOrd);
    const v1 = tgsePapers.filter(p => p.track !== 'v2').sort(byOrd);
    const [allOpen, setAllOpen] = React.useState(true);
    // Bump a "token" whenever toggled, so PaperCards re-sync even if allOpen value didn't change.
    const [token, setToken] = React.useState(0);
    const toggleAll = () => { setAllOpen(o => !o); setToken(t => t+1); };
    const Toggle = window.jpmAbstractsToggle;

    return (
      <main>
        <PageHero fossil="public/fossils/seconde.jpg">
          <Reveal>
            <div className="jpm-kicker">{rFR ? 'Série en cours · depuis 2025' : 'Ongoing series · since 2025'}</div>
            <h1 className="jpm-serif-display" style={{
              fontSize: 'clamp(44px, 6vw, 72px)', margin: '14px 0 18px', fontWeight: 400, letterSpacing: '-.01em',
              lineHeight: 1.05, textWrap: 'balance',
            }}>
              {rFR
                ? <>TGSE — <em style={{color:'var(--accent)'}}>Théorie Générale des Structures Émergentes</em></>
                : <>TGSE — <em style={{color:'var(--accent)'}}>General Theory of Emergent Structures</em></>}
            </h1>
            <p style={{ maxWidth: 760, fontSize: 19, color: 'var(--inkSoft)', fontStyle: 'italic', textWrap:'pretty', lineHeight: 1.55 }}>
              {rFR
                ? <>[Intro TGSE à rédiger — texte de présentation de la série, objectifs, méthodes, articulation v1/v2.]</>
                : <>[TGSE intro to be written — series overview, goals, methods, v1/v2 articulation.]</>}
            </p>
          </Reveal>
        </PageHero>

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 56px' }}>

        {/* MANIFESTE — placeholder */}
        <Reveal delay={120}>
          <div style={{ margin: '56px 0 0', border: '1px solid var(--rule)', padding: '32px 36px', background: 'var(--paperAlt)' }}>
            <div className="jpm-kicker" style={{ marginBottom: 10 }}>{rFR ? 'Manifeste' : 'Manifesto'}</div>
            <p style={{ fontStyle:'italic', color:'var(--inkSoft)', margin: 0, fontSize: 15, lineHeight: 1.7 }}>
              {rFR
                ? '[Manifeste TGSE à rédiger — ce que cherche la série, ce qu\'elle refuse, ses engagements méthodologiques.]'
                : '[TGSE manifesto to be written — what the series seeks, what it refuses, its methodological commitments.]'}
            </p>
          </div>
        </Reveal>

        {/* V2 — CHANTIER ACTIF */}
        {v2.length > 0 && (
          <section style={{ marginTop: 80 }}>
            <Reveal>
              <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 8, flexWrap:'wrap' }}>
                <span className="jpm-mono" style={{ fontSize: 10, letterSpacing:'.2em', padding: '4px 10px', background:'var(--accent)', color:'var(--paper)', textTransform:'uppercase' }}>v2 · {rFR?'chantier actif':'active work'}</span>
                <span style={{ fontSize: 13, color:'var(--inkSoft)', fontStyle:'italic' }}>{rFR?'En cours de rédaction.':'Work in progress.'}</span>
                <div style={{ marginLeft:'auto' }}>
                  <Toggle open={allOpen} onToggle={toggleAll} rFR={rFR} />
                </div>
              </div>
              <h2 className="jpm-serif-display" style={{ fontSize: 28, margin: '8px 0 24px', fontWeight: 400, fontStyle:'italic' }}>
                {rFR ? 'Propédeutique mathématique — refonte' : 'Mathematical propaedeutic — overhaul'}
              </h2>
            </Reveal>
            {v2.map(p => <window.jpmPaperCard key={p.doi} p={p} rFR={rFR} seriesLabel="TGSE" forceOpen={allOpen} toggleToken={token} />)}
          </section>
        )}

        {/* V1 — SÉRIE INITIALE */}
        {v1.length > 0 && (
          <section style={{ marginTop: 80 }}>
            <Reveal>
              <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 8 }}>
                <span className="jpm-mono" style={{ fontSize: 10, letterSpacing:'.2em', padding: '4px 10px', border:'1px solid var(--ruleStrong)', color:'var(--ruleStrong)', textTransform:'uppercase' }}>v1 · {rFR?'série initiale':'initial series'}</span>
                <span style={{ fontSize: 13, color:'var(--inkSoft)', fontStyle:'italic' }}>{rFR?'Sera progressivement révisée dans la v2.':'To be progressively revised in v2.'}</span>
              </div>
              <h2 className="jpm-serif-display" style={{ fontSize: 28, margin: '8px 0 24px', fontWeight: 400, fontStyle:'italic' }}>
                {rFR ? 'Articles parus' : 'Published papers'}
              </h2>
            </Reveal>
            {v1.map(p => <window.jpmPaperCard key={p.doi} p={p} rFR={rFR} seriesLabel="TGSE" forceOpen={allOpen} toggleToken={token} />)}
          </section>
        )}
        </div>
      </main>
    );
  }

  window.jpmTGSE = TGSE;
})();
