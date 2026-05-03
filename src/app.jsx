// App mount
(function(){
  const { jpmUseTheme, jpmUseLang, jpmUseRoute,
          jpmHome, jpmResearch, jpmEMV, jpmTGSE, jpmORA, jpmTeaching, jpmCV, jpmContact } = window;
  // Capitalize component references — JSX treats lowercase tags as plain HTML.
  const Header = window.jpmHeader;
  const Footer = window.jpmFooter;

  const TITLES = {
    home: 'Lemniscate — Jean-Philippe Mouton · Mathématiques & Manuscrit de Voynich',
    research: 'Articles & publications — Jean-Philippe Mouton',
    emv: 'EMV — Études du Manuscrit de Voynich · Jean-Philippe Mouton',
    'tgse-series': 'TGSE — Théorie Générale des Structures Émergentes · Jean-Philippe Mouton',
    'ora-series': 'ORA — Opérateur de Résonance Arithmétique · Jean-Philippe Mouton',
    teaching: 'Enseignement — Jean-Philippe Mouton · Collège Jean Rostand, Capbreton',
    cv: 'Curriculum vitæ — Jean-Philippe Mouton',
    contact: 'Correspondance — Jean-Philippe Mouton',
  };

  function App() {
    const [theme, setTheme] = jpmUseTheme();
    const [lang, setLang] = jpmUseLang();
    const [route, nav] = jpmUseRoute();

    React.useEffect(() => {
      document.title = TITLES[route] || TITLES.home;
    }, [route]);

    let Page;
    switch (route) {
      case 'research': Page = jpmResearch; break;
      case 'emv':      Page = jpmEMV; break;
      case 'tgse-series': Page = jpmTGSE; break;
      case 'ora-series':  Page = jpmORA; break;
      case 'teaching': Page = jpmTeaching; break;
      case 'cv':       Page = jpmCV; break;
      case 'contact':  Page = jpmContact; break;
      default: Page = jpmHome;
    }

    return (
      <window.jpmPdfProvider>
        <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} route={route} nav={nav} />
        <div key={route} className="jpm-fadein">
          <Page lang={lang} nav={nav} />
        </div>
        <Footer lang={lang} />
      </window.jpmPdfProvider>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
})();
