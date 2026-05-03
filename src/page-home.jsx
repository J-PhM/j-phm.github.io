// Home page — hero, featured series, selected papers.
(function(){
  const { jpmReveal: Reveal, jpmFossilHero: FossilHero } = window;

  function Home({ lang, nav }) {
    const D = window.SITE;
    const rFR = lang === 'fr';
    const recent = D.papers
      .filter(p => p.year >= 2025)
      .sort((a,b) => (b.year - a.year) || ((b.month||0) - (a.month||0)))
      .slice(0, 6);

    const chantiers = [
      { k:'peda', route:'teaching', fr:'Pédagogie & ressources', en:'Teaching & resources',
        frDesc:"Ressources pour l'enseignement des mathématiques : herbier de courbes avec GeoGebra, brochure collective IREM sur les fonctions, travaux didactiques.",
        enDesc:"Resources for mathematics teaching: herbarium of curves with GeoGebra, collective IREM brochure on functions, didactic work." },
      { k:'tgse', route:'tgse-series', active:true, fr:'Série TGSE — Théorie Générale des Structures Émergentes', en:'TGSE Series — General Theory of Emergent Structures',
        frDesc:"Refonte en cours : une Propédeutique mathématique qui remplace progressivement la série initiale (v1, 2025).",
        enDesc:"Ongoing rewrite: a mathematical preparatory volume progressively replacing the initial series (v1, 2025)." },
      { k:'ora', route:'ora-series', fr:'Série ORA — Opérateur de Résonance Arithmétique', en:'ORA Series — Arithmetic Resonance Operator',
        frDesc:"Un opérateur géométrique pour l'étude des nombres premiers et des structures quasi-cristallines logarithmiques. Comprend l'approche variationnelle de l'hypothèse de Riemann (ORA ∩ TGSE).",
        enDesc:"A geometric operator for the study of prime numbers and logarithmic quasi-crystalline structures. Includes the variational approach to the Riemann hypothesis (ORA ∩ TGSE)." },
      { k:'emv', route:'emv', active:true, fr:'Série EMV — Études du Manuscrit de Voynich', en:'EMV Series — Studies on the Voynich Manuscript',
        frDesc:"Exploration statistique systématique : contraintes formelles, tests d'hypothèses, cartographie des régularités.",
        enDesc:"Systematic statistical exploration: formal constraints, hypothesis testing, mapping of regularities." },
    ];

    return (
      <main>
        {/* HERO */}
        <section style={{ padding: '90px 56px 80px', maxWidth: 1180, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 440px',
            gap: 56, alignItems: 'start',
          }} className="jpm-hero-grid">
            <div>
              <div className="jpm-kicker jpm-fadein">{rFR ? 'Site personnel · Jean-Philippe Mouton' : 'Personal site · Jean-Philippe Mouton'}</div>
              <h1 className="jpm-serif-display jpm-fadein-2" style={{
                fontSize: 'clamp(44px, 5.8vw, 84px)', lineHeight: 1.02, margin: '24px 0 28px',
                fontWeight: 400, letterSpacing: '-0.01em', textWrap: 'balance',
              }}>
                Lemniscate
              </h1>
              <p className="jpm-fadein-3" style={{
                maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--inkSoft)',
                textWrap: 'pretty', margin: 0,
              }}>
                {rFR
                  ? <>Professeur de mathématiques de l'Éducation nationale, collège <strong style={{color:'var(--ink)'}}>Jean Rostand</strong> à Capbreton.</>
                  : <>Mathematics teacher (French Ministry of National Education), <strong style={{color:'var(--ink)'}}>Collège Jean Rostand</strong>, Capbreton.</>}
              </p>
              <p className="jpm-fadein-3" style={{
                maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--inkSoft)',
                textWrap: 'pretty', margin: '10px 0 0',
              }}>
                {rFR
                  ? <>Chercheur indépendant — opérateur de résonance sur les nombres premiers, modélisation de l'émergence, études du manuscrit de Voynich, outils pédagogiques.</>
                  : <>Independent researcher — resonance operator on prime numbers, modelling of emergence, studies of the Voynich manuscript, pedagogical tools.</>}
              </p>
              <div className="jpm-fadein-3" style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a onClick={() => nav('research')} className="jpm-btn" style={{cursor:'pointer'}}>
                  {rFR ? 'Voir les publications' : 'View publications'} →
                </a>
              </div>
            </div>

            {/* FOSSIL HERO */}
            <FossilHero src="/public/fossils/accueil.jpg" />
          </div>
        </section>

        {/* RULE */}
        <div style={{ borderTop: '1px solid var(--rule)', margin: '0 56px' }} />

        {/* CHANTIERS */}
        <section style={{ padding: '80px 56px', maxWidth: 1180, margin: '0 auto' }}>
          <Reveal><div className="jpm-kicker" style={{ marginBottom: 8 }}>{rFR ? 'I.  Chantiers de recherche' : 'I.  Research programmes'}</div></Reveal>
          <Reveal delay={80}>
            <h2 className="jpm-serif-display" style={{ fontSize: 42, margin: '0 0 48px', fontWeight: 400, fontStyle: 'italic', letterSpacing:'-.005em' }}>
              {rFR ? 'Quatre fils conducteurs.' : 'Four guiding threads.'}
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--rule)', border: '1px solid var(--rule)' }}>
            {chantiers.map((c, i) => (
              <Reveal key={c.k} delay={i * 90} style={{ display: 'flex' }}>
                <a onClick={() => nav(c.route)}
                  style={{
                    display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
                    padding: '36px 40px', background: 'var(--paper)',
                    cursor: 'pointer', textDecoration: 'none', color: 'inherit',
                    transition: 'background .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--paperAlt)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--paper)'}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div className="jpm-mono" style={{ fontSize: 10.5, letterSpacing: '.2em', color: 'var(--ruleStrong)' }}>§ {String(i+1).padStart(2,'0')}</div>
                    {c.active && (
                      <span className="jpm-mono" style={{ fontSize: 9.5, letterSpacing:'.2em', padding: '3px 8px', background:'var(--accent)', color:'var(--paper)', textTransform:'uppercase' }}>
                        {rFR ? 'actif' : 'active'}
                      </span>
                    )}
                  </div>
                  <h3 className="jpm-serif-display" style={{ fontSize: 28, margin: '10px 0 12px', fontWeight: 400 }}>
                    {rFR ? c.fr : c.en}
                  </h3>
                  <p style={{ color: 'var(--inkSoft)', fontSize: 15.5, lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
                    {rFR ? c.frDesc : c.enDesc}
                  </p>
                  <div className="jpm-mono" style={{ fontSize: 11, letterSpacing: '.16em', color: 'var(--accent)', marginTop: 'auto', paddingTop: 18, textTransform: 'uppercase' }}>
                    {rFR ? 'Lire →' : 'Read →'}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* RÉCENT */}
        <section style={{ padding: '60px 56px 20px', maxWidth: 1180, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 30, borderBottom: '1px solid var(--rule)', paddingBottom: 16 }}>
              <div>
                <div className="jpm-kicker" style={{ marginBottom: 6 }}>{rFR ? 'II.  Publications récentes' : 'II.  Recent publications'}</div>
                <h2 className="jpm-serif-display" style={{ fontSize: 32, margin: 0, fontWeight: 400, fontStyle: 'italic' }}>
                  {rFR ? 'Six parutions depuis 2025' : 'Six papers since 2025'}
                </h2>
              </div>
              <a onClick={() => nav('research')} className="jpm-link" style={{ fontSize: 14, fontStyle: 'italic', cursor:'pointer' }}>
                {rFR ? 'Tout voir' : 'See all'} →
              </a>
            </div>
          </Reveal>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {recent.map((p, i) => (
              <Reveal key={p.doi} delay={i * 60} as="li">
                <a href={p.url || `https://doi.org/${p.doi}`} target="_blank" rel="noopener"
                  style={{
                    display: 'grid', gridTemplateColumns: '90px 1fr 180px', gap: 24,
                    padding: '22px 0', borderBottom: '1px dotted var(--rule)',
                    textDecoration: 'none', color: 'inherit',
                    transition: 'padding .2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.paddingLeft = '16px'; e.currentTarget.querySelector('[data-arrow]').style.opacity = 1; }}
                  onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; e.currentTarget.querySelector('[data-arrow]').style.opacity = 0; }}>
                  <div className="jpm-mono" style={{ fontSize: 12, color: 'var(--ruleStrong)', letterSpacing:'.1em', paddingTop: 3 }}>
                    {p.year}.{String(p.month||1).padStart(2,'0')}
                  </div>
                  <div>
                    <div className="jpm-mono" style={{ fontSize: 10.5, letterSpacing: '.14em', textTransform:'uppercase', color: 'var(--accent)', marginBottom: 6 }}>
                      {D.series[p.series] ? (rFR ? D.series[p.series].fr : D.series[p.series].en) : p.type}
                    </div>
                    <div className="jpm-serif-display" style={{ fontSize: 20, lineHeight: 1.3, textWrap: 'balance' }}>
                      {p.title}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
                    <span className="jpm-mono" style={{ fontSize: 10.5, color: 'var(--inkSoft)', letterSpacing:'.08em' }}>doi</span>
                    <span data-arrow style={{ opacity: 0, transition: 'opacity .2s', color: 'var(--accent)', fontSize: 18 }}>→</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </ol>
        </section>
      </main>
    );
  }

  window.jpmHome = Home;
})();
