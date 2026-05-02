// App mount
(function(){
  const { jpmUseTheme, jpmUseLang, jpmUseRoute,
          jpmHome, jpmResearch, jpmEMV, jpmTGSE, jpmORA, jpmTeaching, jpmCV, jpmContact } = window;
  // Capitalize component references — JSX treats lowercase tags as plain HTML.
  const Header = window.jpmHeader;
  const Footer = window.jpmFooter;

  function App() {
    const [theme, setTheme] = jpmUseTheme();
    const [lang, setLang] = jpmUseLang();
    const [route, nav] = jpmUseRoute();

    let Page;
    switch (route) {
      case 'research': Page = jpmResearch; break;
      case 'emv':      Page = jpmEMV; break;
      case 'tgse-series': Page = jpmTGSE; break;
      case 'ora-series':  Page = jpmORA; break;
      case 'teaching': Page = jpmTeaching; break;
      case 'cv':       Page = jpmCV; break;
      case 'contact':  Page = jpmContact; break;
      case 'ora':
      case 'tgse':
      case 'peda':
      case 'these':
        // Series hash redirects to research page.
        Page = jpmResearch;
        break;
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
