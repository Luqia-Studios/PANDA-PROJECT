/* Apply translations. Texts and layout are supplied by the build. */
(() => {
  if (window.PANDA_I18N?.apply) return;
  const { copy } = window.PANDA_TRANSLATIONS;
  const apply = (language) => {
    if (!Object.hasOwn(copy, language)) language = 'it';
    const values = { ...copy.it, ...(copy[language] || {}) };
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = values[element.dataset.i18n];
      if (!value) return;
      if (element.dataset.i18nHtml !== undefined) element.innerHTML = value;
      else {
        const firstText = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
        if (firstText) firstText.nodeValue = `${value} `;
        else element.textContent = value;
      }
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const value = values[element.dataset.i18nAria];
      if (value) element.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      const value = values[element.dataset.i18nTitle];
      if (value) element.title = value;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const value = values[element.dataset.i18nAlt];
      if (value) element.setAttribute("alt", value);
    });
    Object.assign(window.PANDA_I18N, { language, values });
    document.dispatchEvent(new CustomEvent("panda-language-change", { detail: window.PANDA_I18N }));
    const toggle = document.querySelector("[data-language-toggle]");
    if (toggle) {
      toggle.firstChild.nodeValue = `${values.language} `;
      toggle.querySelector("strong").textContent = language.toUpperCase();
    }
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.language === language);
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
  };


  window.PANDA_I18N = { apply, language:null, values:{} };
})();
