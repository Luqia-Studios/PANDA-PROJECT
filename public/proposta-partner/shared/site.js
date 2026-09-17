(() => {
  const initializeMenu = () => {
    const menuButton = document.querySelector("#menu-button");
    const menuClose = document.querySelector("#menu-close");
    const siteMenu = document.querySelector("#site-menu");
    const exploreToggle = siteMenu?.querySelector(".site-menu__project-toggle");
    const explorePanel = siteMenu?.querySelector(".site-menu__explore-panel");

    if (!menuButton || !siteMenu || menuButton.dataset.menuReady === "true") return;

    const setExplore = (open) => {
      if (!exploreToggle || !explorePanel) return;
      explorePanel.hidden = !open;
      exploreToggle.setAttribute("aria-expanded", String(open));
    };

    const setMenu = (open) => {
      siteMenu.classList.toggle("is-open", open);
      siteMenu.setAttribute("aria-hidden", String(!open));
      menuButton.setAttribute("aria-expanded", String(open));
      if (open) menuClose?.focus();
      else {
        setExplore(false);
        menuButton.focus();
      }
    };

    menuButton.dataset.menuReady = "true";
    menuButton.addEventListener("click", () => setMenu(true));
    menuClose?.addEventListener("click", () => setMenu(false));
    exploreToggle?.addEventListener("click", () => setExplore(exploreToggle.getAttribute("aria-expanded") !== "true"));
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
      setMenu(false);
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeMenu);
  else initializeMenu();
})();
