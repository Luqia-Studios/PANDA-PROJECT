/* Load automatically after the first rendering opportunity; the static poster remains visible. */
(() => {
const pandaModel = document.querySelector("#panda-model");
      const pandaModelShell = document.querySelector("#panda-model-shell");
      const pandaModelPoster = document.querySelector("#panda-model-poster");
      let modelReady = false, modelVisible = true, interacting = false, idleTimer;
      const updateRotation = () => pandaModel?.toggleAttribute('auto-rotate', modelReady && modelVisible && !document.hidden && !interacting && !document.querySelector('dialog[open]'));
      const pauseRotation = () => { clearTimeout(idleTimer); interacting = true; updateRotation(); };
      const resumeAfterIdle = () => {
        if (!interacting) return;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => { interacting = false; updateRotation(); }, 3000);
      };
      pandaModel?.setAttribute('auto-rotate-delay', '0');
      pandaModel?.addEventListener('pointerdown', pauseRotation);
      window.addEventListener('pointerup', resumeAfterIdle);
      window.addEventListener('pointercancel', resumeAfterIdle);
      pandaModel?.addEventListener('keydown', event => { if (event.key.startsWith('Arrow')) pauseRotation(); });
      pandaModel?.addEventListener('keyup', event => { if (event.key.startsWith('Arrow')) resumeAfterIdle(); });
      document.addEventListener('visibilitychange', updateRotation);
      if ('IntersectionObserver' in window) new IntersectionObserver(entries => { modelVisible = entries[0].isIntersecting; updateRotation(); }).observe(pandaModelShell);
      new MutationObserver(updateRotation).observe(document.documentElement, {subtree:true, attributes:true, attributeFilter:['open']});
      const showPandaModel = (ready) => {
        modelReady = ready;
        updateRotation();
        // Expose the interaction surface of the pinned viewer for scoped focus styles.
        pandaModel?.shadowRoot?.querySelector('.userInput')?.setAttribute('part', 'interaction');
        pandaModelShell?.classList.toggle("has-model", ready);
        if (pandaModelPoster) pandaModelPoster.hidden = ready;
        if (pandaModel) {
          pandaModel.inert = !ready;
          if (ready) pandaModel.removeAttribute("aria-hidden");
          else pandaModel.setAttribute("aria-hidden", "true");
        }
      };
      pandaModel?.addEventListener("error", () => showPandaModel(false));
      const setModelFraming = () => {
        if (!pandaModel) return;
        const distance = window.matchMedia("(max-width: 680px)").matches ? "96%" : "88%";
        pandaModel.setAttribute("camera-orbit", `36deg 72deg ${distance}`);
        pandaModel.setAttribute("min-camera-orbit", `auto auto ${distance}`);
        pandaModel.setAttribute("max-camera-orbit", `auto auto ${distance}`);
      };
      pandaModel?.addEventListener("load", () => {
        setModelFraming();
        showPandaModel(true);
      });
      // A cached component may finish before these listeners are attached.
      customElements.whenDefined("model-viewer").then(() => {
        if (pandaModel?.loaded) {
          setModelFraming();
          showPandaModel(true);
        }
      });
      window.matchMedia("(max-width: 680px)").addEventListener("change", setModelFraming);
      setModelFraming();
      const loadModelLibrary = () => requestAnimationFrame(() => requestAnimationFrame(() => {
        import("https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js").catch(() => showPandaModel(false));
      }));
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadModelLibrary, { once:true });
      else loadModelLibrary();

})();
