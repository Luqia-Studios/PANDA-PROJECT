(() => {
  const initializeMenu = () => {
    const menuButton = document.querySelector("[data-menu-open]");
    const menuClose = document.querySelector("[data-menu-close]");
    const siteMenu = document.querySelector("[data-site-menu]");

    if (!menuButton || !siteMenu || menuButton.dataset.menuReady === "true") return;

    const openMenu = () => {
      if (siteMenu.open) return;
      siteMenu.inert = false;
      siteMenu.showModal();
      siteMenu.classList.add("is-open");
      menuButton.setAttribute("aria-expanded", "true");
      menuClose?.focus();
    };
    const closeMenu = () => { if (siteMenu.open) siteMenu.close(); };

    menuButton.dataset.menuReady = "true";
    menuButton.setAttribute("aria-haspopup", "dialog");
    siteMenu.inert = true;
    menuButton.addEventListener("click", openMenu);
    menuClose?.addEventListener("click", closeMenu);
    siteMenu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    // Escape closes the native modal. Tab wraps inside its visible controls.
    siteMenu.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const controls = [...siteMenu.querySelectorAll('a[href], button:not(:disabled)')]
        .filter((control) => control.getClientRects().length && !control.closest('[hidden], [inert]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    });
    siteMenu.addEventListener("close", () => {
      siteMenu.classList.remove("is-open");
      siteMenu.inert = true;
      menuButton.setAttribute("aria-expanded", "false");
      const returnFocus = menuButton.getClientRects().length ? menuButton : document.querySelector('[data-home-brand]');
      returnFocus?.focus();
    });
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) closeMenu();
    });
    window.matchMedia('(min-width:768px)').addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeMenu);
  else initializeMenu();
})();
