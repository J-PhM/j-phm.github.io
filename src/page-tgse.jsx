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
                ? <>La TGSE est un programme de mathématique poursuivi depuis la maîtrise de 1998 et publié à partir de 2025. Elle cherche à formaliser le concept d'émergence : le processus par lequel des structures organisées apparaissent à partir de composants plus élémentaires. Elle introduit pour cela un degré d'existence α, scalaire compris entre 0 et 1, qui mesure à quel point une structure a achevé son devenir : un cristal parfait a α ≈ 1, un gaz à l'équilibre a α ≈ 0, et c'est entre les deux que vivent les objets intéressants.</>
                : <>TGSE is a mathematical programme pursued since the master's thesis of 1998 and published from 2025 onward. It seeks to formalise the concept of emergence: the process by which organised structures arise from more elementary components. To that end, it introduces a degree of existence α, a scalar between 0 and 1 measuring how completely a structure has achieved its becoming: a perfect crystal has α ≈ 1, a gas at equilibrium has α ≈ 0, and the interesting objects live in between.</>}
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
                  La TGSE part d'une idée simple : doter chaque nombre réel d'un degré d'existence α ∈ (0, 1], et d'un élément ∅ pour l'inexistence. Sur la structure ainsi obtenue, les opérations naturelles (propagation des degrés, consolidation de sources indépendantes) ne sont pas un choix : ce sont les seuls polynômes possibles. Cette rigidité, démontrée comme théorème, n'est pas un détail technique. Elle dit que la théorie n'est pas une convention : si l'on accepte ses axiomes, sa forme est forcée.
                </p>
                <p style={{ margin: '0 0 14px' }}>
                  Le programme se déploie en deux phases. La propédeutique mathématique (TGSE I à VI) construit les outils : arithmétique graduée, extension hyperréelle, structure non standard, structure causale, extension complexe, formalisme des systèmes gradués généralisés. La théorie proprement dite (TGSE VII à X) les met au travail : émergence de l'atome d'hydrogène et de l'espace-temps gravitationnel, théorèmes inter-niveaux et structure catégorique, cohomologie graduée et topos élémentaire, cascades ∞-catégoriques à l'échelle cosmologique.
                </p>
                <p style={{ margin: '0 0 14px' }}>
                  Une refonte de l'ensemble est en cours depuis avril 2026 (v2). Elle reprend les articles sur une base axiomatique resserrée, avec preuves complètes, constructions explicites, et résultats nouveaux. Le travail commence par les premiers articles de la propédeutique et progresse dans l'ordre. Les articles v1 restent en ligne, marqués comme remplacés au fur et à mesure des refontes, et accessibles comme jalons du chemin parcouru.
                </p>
                <p style={{ margin: 0 }}>
                  Engagements méthodologiques : axiomatique d'abord, applications ensuite ; rigidité préférée à la généralité ; aucune prétention à se substituer aux théories physiques établies : la TGSE explore un langage de l'émergence, non une physique alternative. Chaque article est daté, déposé sur Zenodo et ResearchGate, et révisable.
                </p>
              </div>
            ) : (
              <div style={{ color:'var(--ink)', margin: 0, fontSize: 15, lineHeight: 1.75 }}>
                <p style={{ margin: '0 0 14px' }}>
                  TGSE starts from a simple idea: endow each real number with a degree of existence α ∈ (0, 1], together with an element ∅ for nonexistence. On the resulting structure, the natural operations (propagation of degrees, consolidation of independent sources) are not a choice: they are the only possible polynomials. This rigidity, proven as a theorem, is not a technical detail. It says that the theory is not a convention: if one accepts its axioms, its form is forced.
                </p>
                <p style={{ margin: '0 0 14px' }}>
                  The programme unfolds in two phases. The mathematical propaedeutic (TGSE I to VI) builds the tools: graduated arithmetic, hyperreal extension, nonstandard structure, causal structure, complex extension, formalism of generalised graduated systems. The theory proper (TGSE VII to X) puts them to work: emergence of the hydrogen atom and gravitational spacetime, inter-level theorems and categorical structure, graduated cohomology and elementary topos, ∞-categorical cascades at the cosmological scale.
                </p>
                <p style={{ margin: '0 0 14px' }}>
                  A complete overhaul has been under way since April 2026 (v2). It revisits the articles on a tightened axiomatic base, with complete proofs, explicit constructions, and new results. The work begins with the early articles of the propaedeutic and proceeds in order. The v1 articles remain online, marked as superseded as the rewrites land, and accessible as milestones along the way.
                </p>
                <p style={{ margin: 0 }}>
                  Methodological commitments: axioms first, applications second; rigidity preferred to generality; no claim to displace established physical theories: TGSE explores a language of emergence, not an alternative physics. Each paper is dated, deposited on Zenodo and ResearchGate, and revisable.
                </p>
              </div>
            )}
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
