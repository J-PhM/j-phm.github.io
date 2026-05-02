// fiche-theme.js — synchronise le thème jour/nuit avec le site parent.
// Lit/écrit `jpm-theme` dans localStorage (même clé que le site) et applique
// `data-theme` sur <html>. Doit être chargé en <head> SANS defer pour éviter
// le flash de thème incorrect.
(function () {
  var STORAGE_KEY = 'jpm-theme';

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
  }

  function current() {
    try { return localStorage.getItem(STORAGE_KEY) || 'light'; }
    catch (e) { return 'light'; }
  }

  // 1. Apply immediately (avant rendu)
  apply(current());

  // 2. Sync entre onglets / avec le site
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY && e.newValue) apply(e.newValue);
  });

  // 3. Toggle button — injecté quand le DOM est prêt
  function installToggle() {
    if (document.getElementById('fiche-theme-toggle')) return;
    var btn = document.createElement('button');
    btn.id = 'fiche-theme-toggle';
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Basculer le thème');
    function render() {
      var isDark = document.documentElement.dataset.theme === 'dark';
      btn.title = isDark ? 'Mode clair' : 'Mode sombre';
      btn.innerHTML = isDark
        ? '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.5 1.5M11.5 11.5 13 13M3 13l1.5-1.5M11.5 4.5 13 3"/></svg>'
        : '<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M6 0a6 6 0 0 0 6 8 8 8 0 1 1-6-8"/></svg>';
    }
    btn.addEventListener('click', function () {
      var next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
      render();
    });
    render();
    document.body.appendChild(btn);

    // Re-render si quelqu'un d'autre change le thème (storage event)
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY) render();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installToggle);
  } else {
    installToggle();
  }
})();
