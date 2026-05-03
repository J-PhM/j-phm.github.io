// ORA — dedicated thematic page.
(function(){
  const { jpmReveal: Reveal, jpmPageHero: PageHero } = window;

  function ORA({ lang, nav }) {
    const D = window.SITE;
    const rFR = lang === 'fr';
    const oraPapers = D.papers.filter(p => p.series === 'ora').sort((a,b) => (a.ord||99) - (b.ord||99));
    const [allOpen, setAllOpen] = React.useState(true);
    const [token, setToken] = React.useState(0);
    const toggleAll = () => { setAllOpen(o => !o); setToken(t => t+1); };
    const Toggle = window.jpmAbstractsToggle;

    return (
      <main>
        <PageHero fossil="/public/fossils/premiere.jpg">
          <Reveal>
            <div className="jpm-kicker">{rFR ? 'Série en cours · depuis 2025' : 'Ongoing series · since 2025'}</div>
            <h1 className="jpm-serif-display" style={{
              fontSize: 'clamp(44px, 6vw, 72px)', margin: '14px 0 18px', fontWeight: 400, letterSpacing: '-.01em',
              lineHeight: 1.05, textWrap: 'balance',
            }}>
              {rFR
                ? <>ORA — <em style={{color:'var(--accent)'}}>Opérateur de Résonance Arithmétique</em></>
                : <>ORA — <em style={{color:'var(--accent)'}}>Arithmetic Resonance Operator</em></>}
            </h1>
            <p style={{ maxWidth: 760, fontSize: 19, color: 'var(--inkSoft)', fontStyle: 'italic', textWrap:'pretty', lineHeight: 1.55 }}>
              {rFR
                ? <>L'ORA est un programme d'analyse harmonique et de géométrie arithmétique, ouvert à la publication en 2025. Il part d'une intuition : les nombres premiers ne sont pas seulement une suite, ils forment un champ. Lue à travers les phases logarithmiques θ<sub>p</sub> = log p mod 2π, leur distribution fait apparaître une structure d'auto-résonance, ni aléatoire, ni périodique, mais quasi-cristalline. La série construit l'opérateur qui révèle cette structure, en établit les propriétés analytiques, et explore sa rencontre inattendue avec la TGSE pour proposer une approche variationnelle de l'hypothèse de Riemann.</>
                : <>ORA is a programme of harmonic analysis and arithmetic geometry, opened to publication in 2025. It starts from an intuition: prime numbers are not merely a sequence, they form a field. Read through the logarithmic phases θ<sub>p</sub> = log p mod 2π, their distribution reveals a self-resonant structure, neither random nor periodic, but quasi-crystalline. The series constructs the operator that exposes this structure, establishes its analytic properties, and explores its unexpected meeting with TGSE to propose a variational approach to the Riemann hypothesis.</>}
            </p>
          </Reveal>
        </PageHero>

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 56px' }}>

        {/* MANIFESTE — placeholder */}
        <Reveal delay={120}>
          <div style={{ margin: '56px 0 0', border: '1px solid var(--rule)', padding: '32px 36px', background: 'var(--paperAlt)' }}>
            <div className="jpm-kicker" style={{ marginBottom: 10 }}>{rFR ? 'Le projet' : 'The project'}</div>
            {rFR ? (
              <div style={{ color:'var(--ink)', margin: 0, fontSize: 15, lineHeight: 1.75 }}>
                <p style={{ margin: '0 0 14px' }}>
                  La série <em>Opérateur de Résonance Arithmétique</em> part d'une intuition simple : les nombres premiers ne sont pas seulement une suite, ils forment un <em>champ</em>. Leur distribution, lue à travers les phases logarithmiques <span style={{fontStyle:'italic'}}>θ<sub>p</sub> = log p mod 2π</span>, fait apparaître une structure d'auto-résonance, ni aléatoire, ni périodique, mais <em>quasi-cristalline</em>.
                </p>
                <p style={{ margin: '0 0 14px' }}>
                  ORA propose un cadre où cette structure devient un objet mathématique de plein droit : un opérateur agissant sur un hypertore, dont les modes propres éclairent les corrélations fines de la fonction de comptage des premiers. L'ambition est double : donner un contenu analytique précis à l'idée de résonance, et construire un pont vers l'hypothèse de Riemann par voie variationnelle.
                </p>
                <p style={{ margin: '0 0 14px' }}>
                  La série s'articule avec <em>TGSE</em> (Théorie Générale des Structures Émergentes) : là où TGSE décrit les conditions d'émergence d'une cohérence à partir d'un substrat, ORA en donne une incarnation arithmétique. Les deux se rejoignent dans l'article <em>ORA ∩ TGSE</em>, qui formule l'HR comme principe de minimisation d'une fonctionnelle d'incohérence.
                </p>
                <p style={{ margin: 0 }}>
                  Engagements méthodologiques : rigueur analytique classique (Weyl, Baker, théorie analytique des nombres), ouverture catégorielle quand elle clarifie, refus de la mystification. Chaque article est daté, déposé sur Zenodo et ResearchGate, et révisable.
                </p>
              </div>
            ) : (
              <div style={{ color:'var(--ink)', margin: 0, fontSize: 15, lineHeight: 1.75 }}>
                <p style={{ margin: '0 0 14px' }}>
                  The <em>Arithmetic Resonance Operator</em> series starts from a simple intuition: prime numbers are not merely a sequence, they form a <em>field</em>. Their distribution, read through the logarithmic phases <span style={{fontStyle:'italic'}}>θ<sub>p</sub> = log p mod 2π</span>, reveals a self-resonant structure, neither random nor periodic, but <em>quasi-crystalline</em>.
                </p>
                <p style={{ margin: '0 0 14px' }}>
                  ORA proposes a framework in which this structure becomes a full mathematical object: an operator acting on a hypertorus, whose eigenmodes illuminate the fine correlations of the prime-counting function. The ambition is twofold: to give the idea of resonance precise analytic content, and to build a bridge toward the Riemann hypothesis via a variational path.
                </p>
                <p style={{ margin: '0 0 14px' }}>
                  The series connects with <em>TGSE</em> (General Theory of Emergent Structures): where TGSE describes the conditions for coherence to emerge from a substrate, ORA provides an arithmetic embodiment. Both meet in the paper <em>ORA ∩ TGSE</em>, which formulates RH as the minimisation of an incoherence functional.
                </p>
                <p style={{ margin: 0 }}>
                  Methodological commitments: classical analytic rigour (Weyl, Baker, analytic number theory), categorical openness when it clarifies, no mystification. Each paper is dated, deposited on Zenodo and ResearchGate, and remains revisable.
                </p>
              </div>
            )}
          </div>
        </Reveal>

        {/* PAPERS */}
        <section style={{ marginTop: 80 }}>
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap: 12, marginBottom: 8, flexWrap:'wrap' }}>
              <div className="jpm-kicker">{rFR ? 'Articles parus' : 'Published papers'}</div>
              {oraPapers.some(p => p.abstract) && <Toggle open={allOpen} onToggle={toggleAll} rFR={rFR} />}
            </div>
            <h2 className="jpm-serif-display" style={{ fontSize: 28, margin: '0 0 24px', fontWeight: 400, fontStyle:'italic' }}>
              {rFR ? 'Téléchargements directs' : 'Direct downloads'}
            </h2>
          </Reveal>
          {oraPapers.map(p => (
            <window.jpmPaperCard key={p.doi} p={p} rFR={rFR} seriesLabel="ORA" forceOpen={allOpen} toggleToken={token} />
          ))}
        </section>
        </div>
      </main>
    );
  }

  window.jpmORA = ORA;
})();
