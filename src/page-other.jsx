// Teaching, CV, Contact pages.
(function(){
  const { jpmReveal: Reveal, jpmPageHero: PageHero } = window;

  function Teaching({ lang }) {
    const D = window.SITE;
    const rFR = lang === 'fr';
    const t = rFR ? D.teaching.fr : D.teaching.en;
    const fiches = D.fiches;
    const pdf = window.jpmUsePdfViewer();
    return (
      <main>
        <PageHero fossil="/public/fossils/enseignement.jpg">
          <Reveal>
            <div className="jpm-kicker">{rFR ? 'Enseignement' : 'Teaching'}</div>
            <h1 className="jpm-serif-display" style={{ fontSize: 56, margin: '12px 0 20px', fontWeight: 400, letterSpacing: '-.01em' }}>
              {rFR ? 'Salle de classe.' : 'Classroom.'}
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--inkSoft)', fontStyle: 'italic', maxWidth: 700, textWrap: 'pretty' }}>
              {t.intro}
            </p>
            <div className="jpm-mono" style={{ fontSize: 12, letterSpacing: '.14em', marginTop: 24, color: 'var(--accent)', textTransform: 'uppercase' }}>
              ◆ {t.current}
            </div>
          </Reveal>
        </PageHero>

        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 56px' }}>

        {/* ─── FICHES INTERACTIVES ──────────────────────────────────── */}
        <section style={{ marginTop: 80 }}>
          <Reveal>
            <h2 className="jpm-serif-display" style={{ fontSize: 28, fontStyle: 'italic', fontWeight: 400, margin: '0 0 14px', borderBottom: '1px solid var(--rule)', paddingBottom: 16 }}>
              {rFR ? 'Fiches de révision interactives' : 'Interactive revision sheets'}
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--inkSoft)', fontStyle: 'italic', maxWidth: 700, marginBottom: 36, textWrap: 'pretty' }}>
              {rFR
                ? "Compagnons interactifs des cours du collège : leçons, quiz, outils de manipulation, mémo. Une fiche par chapitre, accessible directement dans le navigateur. Le PDF du cours complet est joint à chaque fiche."
                : "Interactive companions to my classroom courses: lessons, quizzes, manipulation tools, memo. One sheet per chapter, directly accessible in the browser. The full course PDF is attached to each sheet."}
            </p>
          </Reveal>

          {fiches.levels.map((lvl, li) => (
            <Reveal key={lvl.key} delay={li*80}>
              <div style={{ marginBottom: 44 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
                  <h3 className="jpm-serif-display" style={{ fontSize: 22, fontWeight: 400, margin: 0, fontStyle: 'italic' }}>
                    {rFR ? lvl.labelFR : lvl.labelEN}
                  </h3>
                  <div className="jpm-mono" style={{ fontSize: 11, letterSpacing: '.14em', color: 'var(--ruleStrong)', textTransform: 'uppercase' }}>
                    {lvl.chapters.length} {rFR ? 'chapitres' : 'chapters'}
                    {lvl.partial && (rFR ? ' · sélection' : ' · selection')}
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: 10,
                }}>
                  {lvl.chapters.map((ch) => {
                    const ready = !!ch.fiche;
                    const Tag = ready ? 'a' : 'div';
                    return (
                      <Tag
                        key={ch.num}
                        {...(ready ? { href: ch.fiche + '?from=teaching' } : {})}
                        style={{
                          display: 'block',
                          padding: '14px 16px',
                          border: '1px solid var(--rule)',
                          background: ready ? 'var(--paper)' : 'transparent',
                          textDecoration: 'none',
                          color: ready ? 'var(--ink)' : 'var(--inkSoft)',
                          opacity: ready ? 1 : 0.55,
                          cursor: ready ? 'pointer' : 'default',
                          transition: 'all .18s',
                          position: 'relative',
                        }}
                        onMouseEnter={ready ? (e) => {
                          e.currentTarget.style.background = 'var(--paperAlt)';
                          e.currentTarget.style.borderColor = 'var(--accent)';
                        } : undefined}
                        onMouseLeave={ready ? (e) => {
                          e.currentTarget.style.background = 'var(--paper)';
                          e.currentTarget.style.borderColor = 'var(--rule)';
                        } : undefined}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                          <div className="jpm-mono" style={{ fontSize: 10.5, letterSpacing: '.14em', color: ready ? 'var(--accent)' : 'var(--ruleStrong)', textTransform: 'uppercase' }}>
                            {rFR ? 'Chap.' : 'Ch.'} {ch.num}
                          </div>
                          {!ready && (
                            <div className="jpm-mono" style={{ fontSize: 9.5, letterSpacing: '.14em', color: 'var(--ruleStrong)', textTransform: 'uppercase', fontStyle: 'italic' }}>
                              {rFR ? 'à venir' : 'soon'}
                            </div>
                          )}
                          {ready && (
                            <div style={{ fontSize: 13, color: 'var(--accent)' }}>↗</div>
                          )}
                        </div>
                        <div className="jpm-serif-display" style={{ fontSize: 15.5, lineHeight: 1.3, marginTop: 4, fontStyle: ready ? 'normal' : 'italic' }}>
                          {ch.title}
                        </div>
                      </Tag>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* ─── PUBLICATIONS PÉDAGOGIQUES ────────────────────────────── */}
        <section style={{ marginTop: 80 }}>
          <Reveal>
            <h2 className="jpm-serif-display" style={{ fontSize: 28, fontStyle: 'italic', fontWeight: 400, margin: '0 0 14px', borderBottom: '1px solid var(--rule)', paddingBottom: 16 }}>
              {rFR ? 'Publications pédagogiques' : 'Pedagogical publications'}
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--inkSoft)', fontStyle: 'italic', maxWidth: 700, marginBottom: 28, textWrap: 'pretty' }}>
              {rFR
                ? "Travaux édités, à destination des enseignants et des classes."
                : "Published works, intended for teachers and classes."}
            </p>
          </Reveal>
          {t.resources.map((r, i) => (
            <Reveal key={i} delay={i*80}>
              <article style={{
                display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 20, alignItems: 'baseline',
                padding: '22px 0', borderBottom: '1px dotted var(--rule)',
              }}>
                <div className="jpm-mono" style={{ fontSize: 12, color: 'var(--ruleStrong)', letterSpacing: '.1em' }}>{r.year}</div>
                <div>
                  <div className="jpm-serif-display" style={{ fontSize: 20, lineHeight: 1.3 }}>{r.title}</div>
                  <div style={{ fontSize: 14.5, color: 'var(--inkSoft)', marginTop: 6, fontStyle: 'italic', textWrap: 'pretty' }}>{r.desc}</div>
                  {r.doi && <div className="jpm-mono" style={{ fontSize: 11, color: 'var(--inkSoft)', marginTop: 6 }}>doi:{r.doi}</div>}
                  {r.isbn && <div className="jpm-mono" style={{ fontSize: 11, color: 'var(--inkSoft)', marginTop: 6 }}>isbn:{r.isbn}</div>}
                </div>
                <div>
                  {r.pdf && <button onClick={() => pdf.open(r.pdf, r.title)} className="jpm-btn" style={{ fontSize: 10, fontFamily: 'inherit', cursor: 'pointer' }}>{rFR ? 'Lire' : 'Read'}</button>}
                  {r.pdf && <a href={r.pdf} download className="jpm-btn ghost" style={{ fontSize: 10, marginLeft: 6 }}>{rFR ? 'Télécharger ↓' : 'Download ↓'}</a>}
                  {r.doi && <a href={`https://doi.org/${r.doi}`} target="_blank" rel="noopener" className="jpm-btn ghost" style={{ fontSize: 10, marginLeft: r.pdf ? 6 : 0 }}>Zenodo ↗</a>}
                  {r.rg && <a href={r.rg} target="_blank" rel="noopener" className="jpm-btn ghost" style={{ fontSize: 10, marginLeft: 6 }}>ResearchGate ↗</a>}
                  {r.url && !r.doi && <a href={r.url} target="_blank" rel="noopener" className="jpm-btn ghost" style={{ fontSize: 10, marginLeft: r.pdf ? 6 : 0 }}>Publimath ↗</a>}
                </div>
              </article>
            </Reveal>
          ))}
        </section>
        </div>
      </main>
    );
  }

  function CV({ lang }) {
    const D = window.SITE;
    const rFR = lang === 'fr';
    const cv = rFR ? D.cv.fr : D.cv.en;
    return (
      <main>
        <PageHero fossil="/public/portrait-square.jpg" alt="Portrait de l'auteur">
          <Reveal>
            <div className="jpm-kicker">{rFR ? 'Curriculum vitæ' : 'Curriculum vitae'}</div>
            <h1 className="jpm-serif-display" style={{ fontSize: 56, margin: '12px 0 20px', fontWeight: 400, letterSpacing: '-.01em' }}>
              {rFR ? 'Parcours.' : 'Career.'}
            </h1>
            <p style={{ color: 'var(--inkSoft)', fontStyle: 'italic', maxWidth: 620, fontSize: 17 }}>
              {rFR
                ? 'Enseignant de mathématiques depuis plus de vingt ans, titularisé en 2011 après un long parcours de contractuel et de vacataire.'
                : 'Mathematics teacher for over twenty years, tenured in 2011 after a long career as a contract and temporary teacher.'}
            </p>
          </Reveal>
        </PageHero>

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 56px' }}>

        <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1fr', gap: 64 }}>
          <CVSection title={rFR ? 'Postes & missions' : 'Positions & missions'} items={cv.employment} />
          <CVSection title={rFR ? 'Formation & qualifications' : 'Education & qualifications'} items={cv.qualifications} />
        </div>

        <Reveal>
          <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--rule)', display:'flex', gap: 14, flexWrap:'wrap' }}>
            <a href={`https://orcid.org/${D.author.orcid}`} target="_blank" rel="noopener" className="jpm-btn ghost">ORCID ↗</a>
            {D.author.links.filter(l => l.label !== 'ORCID').map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener" className="jpm-btn ghost">{l.label} ↗</a>
            ))}
          </div>
        </Reveal>
        </div>
      </main>
    );
  }

  function CVSection({ title, items }) {
    return (
      <section>
        <Reveal>
          <h2 className="jpm-serif-display" style={{ fontSize: 26, fontStyle: 'italic', fontWeight: 400, margin: '0 0 24px', borderBottom: '1px solid var(--rule)', paddingBottom: 12 }}>
            {title}
          </h2>
        </Reveal>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((e, i) => (
            <Reveal key={i} delay={i*50} as="li">
              <div style={{
                display: 'grid', gridTemplateColumns: '150px 1fr', gap: 24,
                padding: '14px 0', borderBottom: '1px dotted var(--rule)',
              }}>
                <div className="jpm-mono" style={{ fontSize: 12, color: 'var(--ruleStrong)', letterSpacing: '.08em', paddingTop: 3 }}>
                  {e.y}
                </div>
                <div>
                  <div className="jpm-serif-display" style={{ fontSize: 17, lineHeight: 1.35 }}>{e.t}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--inkSoft)', fontStyle: 'italic', marginTop: 3 }}>{e.sub}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
    );
  }

  function Contact({ lang }) {
    const D = window.SITE;
    const rFR = lang === 'fr';
    return (
      <main>
        <PageHero fossil="/public/fossils/contact.jpg">
          <Reveal>
            <div className="jpm-kicker">{rFR ? 'Correspondance' : 'Correspondence'}</div>
            <h1 className="jpm-serif-display" style={{ fontSize: 56, margin: '12px 0 24px', fontWeight: 400, letterSpacing: '-.01em' }}>
              {rFR ? 'Correspondance.' : 'Correspondence.'}
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontSize: 19, color: 'var(--inkSoft)', fontStyle: 'italic', lineHeight: 1.55, maxWidth: 640, textWrap: 'pretty' }}>
              {rFR
                ? <>J'accueille volontiers les échanges autour de mes travaux — remarques, objections, suggestions de lecture, collaborations possibles. La voie la plus simple reste le courriel.</>
                : <>I gladly welcome exchanges around my work — remarks, objections, reading suggestions, possible collaborations. Email is the simplest channel.</>}
            </p>
          </Reveal>
        </PageHero>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 56px' }}>

        <Reveal delay={140}>
          <div style={{ marginTop: 56, border: '1px solid var(--rule)', background: 'var(--paperAlt)' }}>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--rule)' }}>
              <div className="jpm-kicker">{rFR ? 'Courriel professionnel' : 'Professional email'}</div>
              <a href={`mailto:${D.author.email}`} className="jpm-serif-display" style={{
                fontSize: 26, color: 'var(--accent)', textDecoration: 'none', display: 'inline-block', marginTop: 8,
                borderBottom: '1px solid currentColor', paddingBottom: 2,
              }}>
                {D.author.email}
              </a>
            </div>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--rule)' }}>
              <div className="jpm-kicker">{rFR ? 'Adresse postale' : 'Postal address'}</div>
              <div style={{ marginTop: 8, fontSize: 16, lineHeight: 1.55, fontStyle:'italic' }}>
                {D.author.name}<br/>
                {rFR ? D.author.postFR : D.author.postEN}<br/>
                Capbreton, France
              </div>
            </div>
            <div style={{ padding: '20px 28px' }}>
              <div className="jpm-kicker">{rFR ? 'Profils en ligne' : 'Online profiles'}</div>
              <div style={{ display:'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
                <a href={`https://orcid.org/${D.author.orcid}`} target="_blank" rel="noopener" className="jpm-btn ghost">ORCID</a>
                {D.author.links.filter(l => l.label !== 'ORCID').map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener" className="jpm-btn ghost">{l.label}</a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        </div>
      </main>
    );
  }

  window.jpmTeaching = Teaching;
  window.jpmCV = CV;
  window.jpmContact = Contact;
})();
