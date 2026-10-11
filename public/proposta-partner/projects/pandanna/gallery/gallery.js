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
  const fallbackLabels = { openPhoto: 'Apri fotografia {current} di {total}', goToPhoto: 'Vai alla fotografia {current}', photo: 'Fotografia {current} di {total}', openVideo: 'Apri video {current} di {total}', goToVideo: 'Vai al video {current}', video: 'Video {current} di {total}' };
  const label = (key, current, total = media.length) => (window.PANDA_I18N?.values[key] || fallbackLabels[key] || "").replace("{current}", number(current)).replace("{total}", total);
  const mediaLabel = (photoKey, videoKey, index) => label(media[index].type === 'video' ? videoKey : photoKey, index);
  const description = (index) => window.PANDA_I18N?.values[`galleryPhoto${index + 1}`] || "";
  const accessibleLabel = (photoKey, videoKey, index) => [mediaLabel(photoKey, videoKey, index), description(index)].filter(Boolean).join(". ");
  const scrollBehavior = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  let opener;
  const updateLabels = () => {
    document.querySelectorAll('.gallery-video-preview__label').forEach((badge) => { badge.textContent = window.PANDA_I18N?.values.videoBadge || "Video"; });
    slides.forEach((slide, index) => slide.setAttribute("aria-label", accessibleLabel("openPhoto", "openVideo", index)));
    thumbs.forEach((thumb, index) => thumb.setAttribute("aria-label", accessibleLabel("goToPhoto", "goToVideo", index)));
    if (stage.firstElementChild) {
      const item = stage.firstElementChild;
      if (item.tagName === "IMG") item.alt = accessibleLabel("photo", "video", active);
      else if (item.tagName === 'VIDEO') item.setAttribute("aria-label", mediaLabel("photo", "video", active));
    }
  };
  const video = (source, className) => {
    const item = document.createElement("video");
    item.className = className;
    item.dataset.src = source;
    item.controls = true;
    item.playsInline = true;
    item.preload = "metadata";
    item.addEventListener('error', () => {
      if (stage.firstElementChild !== item || !item.getAttribute('src')) return;
      const message = document.createElement('p');
      message.className = 'gallery-lightbox__error';
      message.dataset.i18n = 'videoUnavailable';
      message.setAttribute('role', 'status');
      message.textContent = window.PANDA_I18N?.values.videoUnavailable || 'Video non disponibile. Puoi passare al contenuto successivo o chiudere la galleria.';
      stage.replaceChildren(message);
      item.pause();
      item.removeAttribute('src');
      item.load();
    });
    return item;
  };
  // Video previews never fetch MP4 files. Only the open lightbox owns a player.
  const videoPreview = (className) => {
    const item = document.createElement('span');
    item.className = `${className} gallery-video-preview`;
    item.setAttribute('aria-hidden', 'true');
    item.textContent = '▶';
    const badge = document.createElement('span');
    badge.className = 'gallery-video-preview__label';
    badge.textContent = window.PANDA_I18N?.values.videoBadge || 'Video';
    item.append(badge);
    return item;
  };
  const photoPath = (source, variant) => `../../../../assets/images/gallery/${source.id}-${variant}.webp`;
  const createMedia = (source, className, variant = 'preview') => {
    if (source.type === 'video') return variant === 'full' ? video(source.src, className) : videoPreview(className);
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
    if (!item || !item.dataset.src || item.getAttribute('src')) return;
    if (item.dataset.srcset) item.srcset = item.dataset.srcset;
    item.src = item.dataset.src;
  };
  const slides = media.map((source, index) => {
    const slide = document.createElement("button");
    slide.type = "button";
    slide.className = "project-gallery__slide";
    slide.setAttribute("aria-label", accessibleLabel('openPhoto', 'openVideo', index));
    slide.append(createMedia(source, "project-gallery__image"));
    slide.addEventListener("click", () => { if (!dragged) openLightbox(index); });
    rail.append(slide);
    return slide;
  });
  const thumbs = media.map((source, index) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "project-gallery__thumbnail";
    thumb.setAttribute("aria-label", accessibleLabel('goToPhoto', 'goToVideo', index));
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
    thumbs.forEach((thumb, itemIndex) => { thumb.classList.toggle("is-active", itemIndex === active); if (itemIndex === active) thumb.setAttribute("aria-current", "true"); else thumb.removeAttribute("aria-current"); });
    thumbs[active].scrollIntoView({ behavior: scrollBehavior(), block: "nearest", inline: "center" });
    loadNear(active);
    updateLabels();
    if (scroll) slides[active].scrollIntoView({ behavior: scrollBehavior(), block: "nearest", inline: "start" });
  };
  const observer = new IntersectionObserver((entries) => {
    if (dialog.open) return;
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
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); select(active + (event.key === "ArrowRight" ? 1 : -1), true); slides[active].focus({ preventScroll:true }); }
  });
  const clearLightbox = () => {
    const player = stage.querySelector('video');
    if (player) {
      player.pause();
      player.removeAttribute('src');
      player.load();
    }
    stage.replaceChildren();
  };
  const renderLightbox = () => {
    clearLightbox();
    stage.replaceChildren(createMedia(media[active], "gallery-lightbox__image", 'full'));
    loadMedia(stage.firstElementChild);
    select(active);
  };
  const openLightbox = (index) => { opener = document.activeElement; select(index); renderLightbox(); dialog.showModal(); dialog.querySelector(".gallery-lightbox__close").focus(); };
  const stepLightbox = (amount) => { select(active + amount); renderLightbox(); };
  dialog.querySelector(".gallery-lightbox__close").addEventListener("click", () => dialog.close());
  dialog.addEventListener('close', () => { clearLightbox(); if (opener?.isConnected) opener.focus({ preventScroll:true }); });
  dialog.querySelector(".gallery-lightbox__previous").addEventListener("click", () => stepLightbox(-1));
  dialog.querySelector(".gallery-lightbox__next").addEventListener("click", () => stepLightbox(1));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      const controls = [...dialog.querySelectorAll('button:not(:disabled), video[controls]')]
        .filter((item) => item.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    }
    if (event.target.closest('video')) return;
    if (event.key === "ArrowRight") { event.preventDefault(); stepLightbox(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); stepLightbox(-1); }
  });
  let lastWheelNavigation = 0;
  dialog.addEventListener("wheel", (event) => {
    if (event.target.closest('video')) return;
    const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(movement) < 28 || Date.now() - lastWheelNavigation < 360) return;
    event.preventDefault();
    lastWheelNavigation = Date.now();
    stepLightbox(movement > 0 ? 1 : -1);
  }, { passive: false });
  let touchStart = 0;
  stage.addEventListener("pointerdown", (event) => { touchStart = event.target.closest('video') ? null : event.clientX; });
  stage.addEventListener("pointerup", (event) => {
    if (touchStart === null || event.target.closest('video')) return;
    const distance = event.clientX - touchStart;
    if (Math.abs(distance) > 42) stepLightbox(distance < 0 ? 1 : -1);
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stage.querySelector("video")?.pause(); });
  select(0);
  document.addEventListener("panda-language-change", updateLabels);
})();
