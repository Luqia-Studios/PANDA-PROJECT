(() => {
  const initializeMenu = () => {
    const menuButton = document.querySelector("#menu-button");
    const menuClose = document.querySelector("#menu-close");
    const siteMenu = document.querySelector("#site-menu");

    if (!menuButton || !siteMenu || menuButton.dataset.menuReady === "true") return;

    const setMenu = (open) => {
      siteMenu.classList.toggle("is-open", open);
      siteMenu.setAttribute("aria-hidden", String(!open));
      menuButton.setAttribute("aria-expanded", String(open));
      if (open) menuClose?.focus();
      else menuButton.focus();
    };

    menuButton.dataset.menuReady = "true";
    menuButton.addEventListener("click", () => setMenu(true));
    menuClose?.addEventListener("click", () => setMenu(false));
    siteMenu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        siteMenu.classList.remove("is-open");
        siteMenu.setAttribute("aria-hidden", "true");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });
    window.addEventListener("pageshow", () => {
      siteMenu.classList.remove("is-open");
      siteMenu.setAttribute("aria-hidden", "true");
      menuButton.setAttribute("aria-expanded", "false");
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeMenu);
  else initializeMenu();
})();
