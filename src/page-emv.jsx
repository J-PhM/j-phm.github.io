// EMV — dedicated thematic page for Voynich studies.
(function(){
  const { jpmReveal: Reveal, jpmPageHero: PageHero } = window;

  // Folio of the Voynich manuscript — botanical section, Beinecke Rare Book & Manuscript Library.
  // Public-domain scan (Yale University).
  function VoynichMap({ rFR }) {
    return (
      <figure style={{ margin: 0 }}>
        <img
          src="public/voynich-folio.jpg"
          alt={rFR
            ? 'Folio de la section herbier du manuscrit de Voynich (Beinecke MS 408), plante imaginaire à grande feuille ronde accompagnée de texte en voynichois.'
            : 'Folio from the herbal section of the Voynich manuscript (Beinecke MS 408), showing an imaginary round-leafed plant with Voynichese text.'}
          style={{
            display: 'block', width: '100%', height: 'auto',
            maxHeight: 620, objectFit: 'contain',
            filter: 'saturate(.95)',
          }}
        />
      </figure>
    );
  }

  function EMV({ lang, nav }) {
    const D = window.SITE;
    const rFR = lang === 'fr';
    const emvPapers = D.papers.filter(p => p.series === 'emv').sort((a,b) => (a.ord||99) - (b.ord||99));
    const [allOpen, setAllOpen] = React.useState(true);
    const [token, setToken] = React.useState(0);
    const toggleAll = () => { setAllOpen(o => !o); setToken(t => t+1); };
    const Toggle = window.jpmAbstractsToggle;

    const progress = [
      { roman:'I', fr:'Synthèse, contraintes formelles, hypothèses et tests', en:'Synthesis, formal constraints, hypotheses and tests', status:'published', date:'2026 · 04' },
    ];

    return (
      <main>
        <PageHero fossil="public/fossils/autre.jpg">
          <Reveal>
            <div className="jpm-kicker">{rFR ? 'Série en cours · depuis 2026' : 'Ongoing series · since 2026'}</div>
            <h1 className="jpm-serif-display" style={{
              fontSize: 'clamp(44px, 6vw, 72px)', margin: '14px 0 18px', fontWeight: 400, letterSpacing: '-.01em',
              lineHeight: 1.05, textWrap: 'balance',
            }}>
              {rFR ? <>EMV — <em style={{color:'var(--accent)'}}>Études du Manuscrit de Voynich</em></> : <>EMV — <em style={{color:'var(--accent)'}}>Studies on the Voynich Manuscript</em></>}
            </h1>
            <p style={{ maxWidth: 760, fontSize: 19, color: 'var(--inkSoft)', fontStyle: 'italic', textWrap:'pretty', lineHeight: 1.55 }}>
              {rFR
                ? <>Une série d'articles explorant par les outils de la statistique et de l'analyse formelle l'un des plus célèbres textes non déchiffrés : le <strong style={{color:'var(--ink)', fontStyle:'normal'}}>manuscrit de Voynich</strong> (Beinecke MS 408). L'ambition n'est pas de déchiffrer, mais de cartographier les régularités, contraintes et structures qui pèsent sur toute tentative de lecture.</>
                : <>A series of papers exploring, through statistical and formal analysis, one of the most famous undeciphered texts: the <strong style={{color:'var(--ink)', fontStyle:'normal'}}>Voynich manuscript</strong> (Beinecke MS 408). The ambition is not to decipher, but to map the regularities, constraints and structures that weigh on any attempt at reading.</>}
            </p>
          </Reveal>
        </PageHero>

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 56px' }}>

        {/* VISUAL */}
        <Reveal delay={120}>
          <div style={{ margin: '56px 0 0', border: '1px solid var(--rule)', padding: 0, background: 'var(--paperAlt)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--rule)', display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <div className="jpm-kicker">{rFR ? 'Folio — section herbier' : 'Folio — herbal section'}</div>
              <div className="jpm-mono" style={{ fontSize: 10.5, color: 'var(--ruleStrong)' }}>Beinecke MS 408</div>
            </div>
            <div style={{ padding: 24 }}>
              <VoynichMap rFR={rFR} />
            </div>
            <div style={{ padding: '14px 24px', borderTop: '1px solid var(--rule)', fontSize: 12, color: 'var(--inkSoft)', fontStyle:'italic' }}>
              {rFR
                ? 'Manuscrit de Voynich, Beinecke MS 408. Plante imaginaire accompagnée de texte en « voynichois ». Scan numérique, Beinecke Rare Book & Manuscript Library, Yale University (domaine public).'
                : 'Voynich manuscript, Beinecke MS 408. Imaginary plant with accompanying Voynichese text. Digital scan, Beinecke Rare Book & Manuscript Library, Yale University (public domain).'}
            </div>
          </div>
        </Reveal>

        {/* PUBLISHED — unique article */}
        <section style={{ marginTop: 80 }}>
          <Reveal>
            <div className="jpm-kicker" style={{ marginBottom: 8 }}>{rFR ? 'Article paru' : 'Published paper'}</div>
            <h2 className="jpm-serif-display" style={{ fontSize: 36, margin: '0 0 36px', fontWeight: 400, fontStyle:'italic' }}>
              {rFR ? 'Premier volet.' : 'First volume.'}
            </h2>
          </Reveal>
          <ol style={{ listStyle:'none', padding:0, margin:0, borderTop: '1px solid var(--rule)' }}>
            {progress.map((v, i) => (
              <Reveal key={v.roman} delay={i*80} as="li">
                <div style={{
                  display:'grid', gridTemplateColumns: '70px 90px 1fr 150px', gap: 24, alignItems: 'baseline',
                  padding: '24px 0', borderBottom: '1px solid var(--rule)',
                }}>
                  <div className="jpm-serif-display" style={{ fontSize: 36, color: 'var(--accent)', fontStyle: 'italic' }}>
                    {v.roman}
                  </div>
                  <div className="jpm-mono" style={{ fontSize: 11, color: 'var(--ruleStrong)', letterSpacing:'.12em', paddingTop: 10 }}>
                    {v.date}
                  </div>
                  <div style={{ paddingTop: 6 }}>
                    <div className="jpm-serif-display" style={{ fontSize: 20, lineHeight: 1.3 }}>
                      {rFR ? v.fr : v.en}
                    </div>
                  </div>
                  <div style={{ paddingTop: 10 }}>
                    <StatusBadge status={v.status} rFR={rFR} />
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={160}>
            <p style={{ marginTop: 32, fontStyle: 'italic', color: 'var(--inkSoft)', fontSize: 15, maxWidth: 720, textWrap: 'pretty' }}>
              {rFR
                ? 'La suite de la série reste ouverte. Les prochains volets dépendront des pistes ouvertes par ce premier article et ne sont pas encore planifiés.'
                : 'The continuation of the series remains open. Subsequent volumes will depend on the leads opened by this first paper and are not yet scheduled.'}
            </p>
          </Reveal>
        </section>

        {/* PUBLISHED PAPERS */}
        {emvPapers.length > 0 && (
          <section style={{ marginTop: 80 }}>
            <Reveal>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap: 12, marginBottom: 8, flexWrap:'wrap' }}>
                <div className="jpm-kicker">{rFR ? 'Articles parus' : 'Published papers'}</div>
                {emvPapers.some(p => p.abstract) && <Toggle open={allOpen} onToggle={toggleAll} rFR={rFR} />}
              </div>
              <h2 className="jpm-serif-display" style={{ fontSize: 28, margin: '0 0 24px', fontWeight: 400, fontStyle:'italic' }}>
                {rFR ? 'Téléchargements directs' : 'Direct downloads'}
              </h2>
            </Reveal>
            {emvPapers.map(p => (
              <window.jpmPaperCard key={p.doi} p={p} rFR={rFR} seriesLabel="EMV" forceOpen={allOpen} toggleToken={token} />
            ))}
          </section>
        )}
        </div>
      </main>
    );
  }

  function StatusBadge({ status, rFR }) {
    const map = {
      published: { fr: 'PARU', en: 'PUBLISHED', color: 'var(--accent)', filled: true },
      wip:       { fr: 'EN COURS', en: 'IN PROGRESS', color: 'var(--ruleStrong)' },
      planned:   { fr: 'PRÉVU', en: 'PLANNED', color: 'var(--rule)' },
    };
    const s = map[status];
    return (
      <span className="jpm-mono" style={{
        fontSize: 10, letterSpacing: '.2em',
        padding: '5px 10px',
        border: `1px solid ${s.color}`,
        background: s.filled ? s.color : 'transparent',
        color: s.filled ? 'var(--paper)' : s.color,
      }}>
        {rFR ? s.fr : s.en}
      </span>
    );
  }

  window.jpmEMV = EMV;
})();
