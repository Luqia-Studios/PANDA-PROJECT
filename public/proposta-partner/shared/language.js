/* Language selection behavior; markup comes from the shared layout. */
(() => {
  const storeKey = "panda-project-language";
  const supported = Object.keys(window.PANDA_TRANSLATIONS.languages);
  const normalize = (value) => typeof value === 'string' ? value.toLowerCase().split('-')[0] : null;
  const resolve = () => {
    let saved;
    try { saved = localStorage.getItem(storeKey); } catch { /* Storage may be disabled. */ }
    if (supported.includes(saved)) return saved;
    return (navigator.languages || [navigator.language]).map(normalize).find((language) => supported.includes(language)) || 'it';
  };
  const initializeLanguage = () => {
    const toggle = document.querySelector('[data-language-toggle]');
    const modal = document.querySelector('[data-language-modal]');
    if (!toggle || !modal || modal.dataset.languageReady === 'true') return;
    modal.dataset.languageReady = 'true';
    const open = () => {
      if (modal.open) return;
      modal.showModal();
      toggle.setAttribute('aria-expanded', 'true');
      modal.querySelector("[data-language-close]").focus();
    };
    const close = () => {
      if (modal.open) modal.close();
    };
    modal.addEventListener('close', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });
    modal.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const controls = [...modal.querySelectorAll('button')];
      if (event.shiftKey && document.activeElement === controls[0]) {
        event.preventDefault(); controls.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === controls.at(-1)) {
        event.preventDefault(); controls[0].focus();
      }
    });
    toggle.addEventListener("click", open);
    modal.querySelector("[data-language-close]").addEventListener("click", close);
    modal.addEventListener("click", (event) => { if (event.target === modal) close(); });
    modal.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => {
      const language = button.dataset.language;
      try { localStorage.setItem(storeKey, language); } catch { /* Apply the choice even without persistence. */ }
      window.PANDA_I18N.apply(language);
      close();
    }));
    window.PANDA_I18N.apply(resolve());
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeLanguage, {once:true});
  else initializeLanguage();
})();
