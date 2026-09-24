(() => {
  const videos = [
    "VID_20260324_114732_076.mp4", "VID_20260324_114750_157.mp4", "VID_20260324_114758_858.mp4", "VID_20260324_114853_526.mp4", "VID_20260324_114910_159.mp4", "VID_20260324_114926_179.mp4", "VID_20260324_114944_424.mp4", "VID_20260324_114953_324.mp4", "VID_20260324_115052_304.mp4", "VID_20260324_115101_175.mp4", "VID_20260324_115109_960.mp4", "VID_20260324_115117_185.mp4", "VID_20260324_115124_677.mp4", "VID_20260324_115137_068.mp4", "VID_20260324_115202_075.mp4", "grecia-turchia/20260604_050252_1.mp4", "grecia-turchia/20260604_100523.mp4", "grecia-turchia/20260602_052715_1.mp4"
  ].map((file) => ({ type: 'video', src: `../../../../assets/videos/${file}` }));
  const media = [...window.PANDA_GALLERY_PHOTOS.map((photo) => ({ ...photo, type: 'photo' })), ...videos];
  document.querySelectorAll('.project-gallery__counter b, .gallery-lightbox__counter b').forEach((item) => { item.textContent = media.length; });
  const rail = document.querySelector(".project-gallery__rail");
  const thumbnails = document.querySelector(".project-gallery__thumbnails");
  const dialog = document.querySelector(".gallery-lightbox");
  const stage = document.querySelector(".gallery-lightbox__stage");
  const counter = document.querySelector(".project-gallery__counter span");
  const lightboxCounter = document.querySelector(".gallery-lightbox__counter span");
  let active = 0;
  let dragged = false;
  const number = (index) => String(index + 1).padStart(2, "0");
  const label = (key, current, total = media.length) => (window.PANDA_I18N?.values[key] || "").replace("{current}", number(current)).replace("{total}", total);
  const updateLabels = () => {
    slides.forEach((slide, index) => slide.setAttribute("aria-label", label("openPhoto", index)));
    thumbs.forEach((thumb, index) => thumb.setAttribute("aria-label", label("goToPhoto", index)));
    if (stage.firstElementChild) stage.firstElementChild.setAttribute("aria-label", label("photo", active));
  };
  const video = (source, label, className) => {
    const item = document.createElement("video");
    item.className = className;
    item.dataset.src = source;
    item.muted = true;
    item.playsInline = true;
    item.preload = "none";
    item.setAttribute("aria-label", label);
    return item;
  };
  const loadFrame = (item) => {
    if (!item || item.src) return;
    item.src = item.dataset.src;
    item.addEventListener("loadedmetadata", () => { item.currentTime = Math.min(0.35, Math.max(0, item.duration / 5)); }, { once: true });
  };
  const photoPath = (source, variant) => `../../../../assets/images/gallery/${source.id}-${variant}.webp`;
  const createMedia = (source, className, variant = 'preview') => {
    if (source.type === 'video') return video(source.src, '', className);
    const item = document.createElement('img');
    item.className = className;
    item.alt = '';
    item.width = source.width;
    item.height = source.height;
    item.decoding = 'async';
    item.draggable = false;
    item.dataset.src = photoPath(source, variant);
    if (variant === 'preview') {
      const smallWidth = Math.round(source.width * Math.min(1, 640 / Math.max(source.width, source.height)));
      const previewWidth = Math.round(source.width * Math.min(1, 1120 / Math.max(source.width, source.height)));
      item.dataset.srcset = `${photoPath(source, 'small')} ${smallWidth}w, ${photoPath(source, 'preview')} ${previewWidth}w`;
      item.sizes = `(max-width: 760px) min(88vw, ${Math.round(50 * source.width / source.height)}vh), min(1030px, ${Math.round(60 * source.width / source.height)}vh)`;
    }
    return item;
  };
  const loadMedia = (item) => {
    if (!item || item.getAttribute('src')) return;
    if (item.tagName === 'VIDEO') { loadFrame(item); return; }
    if (item.dataset.srcset) item.srcset = item.dataset.srcset;
    item.src = item.dataset.src;
  };
  const slides = media.map((source, index) => {
    const slide = document.createElement("button");
    slide.type = "button";
    slide.className = "project-gallery__slide";
    slide.setAttribute("aria-label", `Apri fotografia ${number(index)} di ${media.length}`);
    slide.append(createMedia(source, "project-gallery__image"));
    slide.addEventListener("click", () => { if (!dragged) openLightbox(index); });
    rail.append(slide);
    return slide;
  });
  const thumbs = media.map((source, index) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "project-gallery__thumbnail";
    thumb.setAttribute("aria-label", `Vai alla fotografia ${number(index)}`);
    thumb.append(createMedia(source, "project-gallery__thumbnail-image", 'thumb'));
    thumb.addEventListener("click", () => select(index, true));
    thumbnails.append(thumb);
    return thumb;
  });
  const loadNear = (index) => [index - 1, index, index + 1].forEach((nearby) => {
    if (nearby < 0 || nearby >= media.length) return;
    loadMedia(slides[nearby].firstElementChild);
    loadMedia(thumbs[nearby].firstElementChild);
  });
  const thumbnailObserver = new IntersectionObserver((entries) => {
    entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
      loadMedia(entry.target.firstElementChild);
      thumbnailObserver.unobserve(entry.target);
    });
  }, { root: thumbnails, rootMargin: '80px' });
  thumbs.forEach((thumb) => thumbnailObserver.observe(thumb));
  const select = (index, scroll = false) => {
    active = Math.max(0, Math.min(index, media.length - 1));
    counter.textContent = number(active);
    lightboxCounter.textContent = number(active);
    slides.forEach((slide, itemIndex) => slide.classList.toggle("is-active", itemIndex === active));
    thumbs.forEach((thumb, itemIndex) => thumb.classList.toggle("is-active", itemIndex === active));
    thumbs[active].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    loadNear(active);
    updateLabels();
    if (scroll) slides[active].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) select(slides.indexOf(visible.target));
  }, { root: rail, threshold: [0.55, 0.7] });
  slides.forEach((slide) => observer.observe(slide));
  let pointerStart = 0;
  let scrollStart = 0;
  let dragging = false;
  rail.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") return;
    pointerStart = event.clientX;
    scrollStart = rail.scrollLeft;
    dragging = true;
    dragged = false;
  });
  rail.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const distance = event.clientX - pointerStart;
    if (Math.abs(distance) > 6) { dragged = true; rail.setPointerCapture(event.pointerId); }
    rail.scrollLeft = scrollStart - distance;
  });
  rail.addEventListener("pointerup", (event) => {
    if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    dragging = false;
    setTimeout(() => { dragged = false; }, 0);
  });
  rail.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); select(active + (event.key === "ArrowRight" ? 1 : -1), true); }
  });
  rail.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaX) || !Math.abs(event.deltaY)) return;
    rail.scrollBy({ left: event.deltaY, behavior: "auto" });
    event.preventDefault();
  }, { passive: false });
  const renderLightbox = () => {
    stage.replaceChildren(createMedia(media[active], "gallery-lightbox__image", 'full'));
    loadMedia(stage.firstElementChild);
    select(active);
  };
  const openLightbox = (index) => { select(index); renderLightbox(); dialog.showModal(); dialog.querySelector(".gallery-lightbox__close").focus(); };
  const stepLightbox = (amount) => { select(active + amount); renderLightbox(); };
  dialog.querySelector(".gallery-lightbox__close").addEventListener("click", () => dialog.close());
  dialog.addEventListener('close', () => stage.replaceChildren());
  dialog.querySelector(".gallery-lightbox__previous").addEventListener("click", () => stepLightbox(-1));
  dialog.querySelector(".gallery-lightbox__next").addEventListener("click", () => stepLightbox(1));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") { event.preventDefault(); stepLightbox(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); stepLightbox(-1); }
  });
  let lastWheelNavigation = 0;
  dialog.addEventListener("wheel", (event) => {
    const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(movement) < 28 || Date.now() - lastWheelNavigation < 360) return;
    event.preventDefault();
    lastWheelNavigation = Date.now();
    stepLightbox(movement > 0 ? 1 : -1);
  }, { passive: false });
  let touchStart = 0;
  stage.addEventListener("pointerdown", (event) => { touchStart = event.clientX; });
  stage.addEventListener("pointerup", (event) => {
    const distance = event.clientX - touchStart;
    if (Math.abs(distance) > 42) stepLightbox(distance < 0 ? 1 : -1);
  });
  select(0);
  document.addEventListener("panda-language-change", updateLabels);
})();
