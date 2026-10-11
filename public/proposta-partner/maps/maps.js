(() => {
  const dataUrl = 'https://script.google.com/macros/s/AKfycbxQfiZ1KIQHFH5tn7gPfkMI6-NMKUtj_uVgygG2eTaVDCW9dqIpm3bwV5TARlj6QBcz/exec?action=getLast&deviceId=cavallo';
  const liveMap = document.querySelector('#live-map');
  const liveFit = document.querySelector('#live-map-fit');
  const mapStatus = document.querySelector('#live-map-state');
  const dataStatus = document.querySelector('#live-data-state');
  const freshness = document.querySelector('#live-freshness');
  const updated = document.querySelector('#live-updated');
  const badge = document.querySelector('#live-status');
  const roadbook = document.querySelector('#roadbook-map');
  const roadbookStatus = document.querySelector('#roadbook-status');
  const fallbackCenter = { lat: 45.57, lon: 10.24 };
  const earthRadius = 6371000;
  const pollDelay = 20000;
  const requestTimeout = 10000;
  const startupTimeout = 15000;
  // A location older than 30 minutes is explicitly labelled as out of date.
  const recentAge = 30 * 60000;
  const defaults = { mapDeferred: 'La mappa si carica quando è visibile.', mapLoading: 'Caricamento della mappa…', mapReady: 'Mappa disponibile', mapError: 'Mappa non disponibile. Puoi aprire la mappa esterna.', positionLoading: 'Caricamento della posizione…', positionReady: 'Posizione disponibile', positionError: 'Aggiornamento della posizione non riuscito.', positionPaused: 'Aggiornamenti sospesi', positionRecent: 'Posizione recente', positionStale: 'Dati non aggiornati', timestampMissing: 'Data di aggiornamento non disponibile', lastUpdate: 'Ultimo aggiornamento', positionArea: 'Raggio dell’area', externalMap: 'Apri la mappa esterna ↗' };
  const text = (key) => window.PANDA_I18N?.values[key] || defaults[key];
  let map, marker, lastPoint, controller, pollTimer, mapTimer, freshnessTimer;
  let mapReady = false;
  let mapVisible = !("IntersectionObserver" in window);
  let mapStarted = false;
  let pageActive = true;
  let refreshPending = false;
  let mapState = mapVisible ? 'mapLoading' : 'mapDeferred';
  let dataState = mapVisible ? 'positionLoading' : 'positionPaused';
  let roadbookState = 'mapLoading';

  const timestamp = (value) => {
    if (value === null || value === undefined || value === '') return null;
    const numeric = typeof value === 'number' || /^\d+(\.\d+)?$/.test(String(value));
    const ms = numeric ? (Number(value) < 2e10 ? Number(value) * 1000 : Number(value)) : Date.parse(value);
    return Number.isFinite(ms) && ms > 0 && ms <= Date.now() + 5 * 60000 && !Number.isNaN(new Date(ms).getTime()) ? ms : null;
  };
  const renderStatus = () => {
    mapStatus.textContent = text(mapState);
    dataStatus.textContent = text(dataState);
    roadbookStatus.textContent = text(roadbookState);
    liveFit.disabled = !mapReady || !lastPoint;
    if (badge) {
      const minutes = lastPoint?.ts === null || !lastPoint ? null : Math.max(0, Math.floor((Date.now() - lastPoint.ts) / 60000));
      const age = minutes === null ? text('timestampMissing') : minutes < 1 ? (window.PANDA_I18N?.values.liveNow || 'ora') : minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h`;
      badge.textContent = mapState === 'mapError' ? text(mapState) : dataState !== 'positionReady' ? text(dataState) : lastPoint ? `${window.PANDA_I18N?.values.liveLocation || 'Posizione live'} - ${age}${lastPoint.mode ? ` - ${lastPoint.mode}` : ''} - r:${Math.round(lastPoint.radiusM / 1000)}km` : text(mapState);
    }
    freshness.textContent = lastPoint ? `${text(lastPoint.ts === null ? 'timestampMissing' : Date.now() - lastPoint.ts <= recentAge ? 'positionRecent' : 'positionStale')} · ${text('positionArea')}: ${Math.round(lastPoint.radiusM / 1000)} km` : '';
    updated.replaceChildren();
    if (lastPoint?.ts !== null && lastPoint?.ts !== undefined) {
      const time = document.createElement('time');
      time.dateTime = new Date(lastPoint.ts).toISOString();
      time.textContent = new Intl.DateTimeFormat(document.documentElement.lang || 'it', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' }).format(lastPoint.ts);
      updated.append(`${text('lastUpdate')}: `, time);
    }
    document.querySelectorAll('[data-map-copy]').forEach((item) => { item.textContent = text(item.dataset.mapCopy); });
  };
  const pointAtDistance = (lat, lon, bearing, distance) => {
    const lat1 = lat * Math.PI / 180;
    const lon1 = lon * Math.PI / 180;
    const delta = distance / earthRadius;
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(delta) + Math.cos(lat1) * Math.sin(delta) * Math.cos(bearing));
    const lon2 = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(delta) * Math.cos(lat1), Math.cos(delta) - Math.sin(lat1) * Math.sin(lat2));
    return [lon2 * 180 / Math.PI, lat2 * 180 / Math.PI];
  };
  const circleFeature = ({ lat, lon, radiusM }) => ({ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [Array.from({ length: 65 }, (_, index) => pointAtDistance(lat, lon, index / 64 * Math.PI * 2, radiusM))] } });
  const fitArea = () => {
    if (!mapReady || !lastPoint) return;
    const points = circleFeature(lastPoint).geometry.coordinates[0];
    const bounds = points.reduce((box, point) => box.extend(point), new window.maplibregl.LngLatBounds(points[0], points[0]));
    map.fitBounds(bounds, { padding: 24, duration: window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? 0 : 350, maxZoom: 16 });
  };
  const renderPoint = () => {
    if (!mapReady || !lastPoint || !mapVisible || document.hidden) return;
    const point = lastPoint;
    if (!marker) {
      const element = document.createElement('div');
      element.className = 'panda-marker';
      marker = new window.maplibregl.Marker({ element, anchor: 'center' }).setLngLat([point.lon, point.lat]).addTo(map);
    } else marker.setLngLat([point.lon, point.lat]);
    const source = map.getSource('panda-circle-src');
    if (source) source.setData(circleFeature(point));
    else {
      map.addSource('panda-circle-src', { type: 'geojson', data: circleFeature(point) });
      map.addLayer({ id: 'panda-circle-fill', type: 'fill', source: 'panda-circle-src', paint: { 'fill-color': '#ff3b30', 'fill-opacity': .12 } });
      map.addLayer({ id: 'panda-circle-line', type: 'line', source: 'panda-circle-src', paint: { 'line-color': '#ff3b30', 'line-width': 1.6, 'line-opacity': .35 } });
    }
    fitArea();
  };
  const schedulePosition = (delay = pollDelay) => {
    clearTimeout(pollTimer);
    if (pageActive && mapVisible && !document.hidden) pollTimer = setTimeout(fetchPosition, delay);
  };
  const fetchPosition = async () => {
    if (!pageActive || !mapVisible || document.hidden || controller) return;
    controller = new AbortController();
    const request = controller;
    const timer = setTimeout(() => request.abort(), requestTimeout);
    if (!lastPoint) dataState = 'positionLoading';
    renderStatus();
    try {
      const response = await fetch(dataUrl, { cache: 'no-store', signal: request.signal });
      if (!response.ok) throw new Error('HTTP error');
      const point = await response.json();
      if (!point?.ok || !Number.isFinite(point.lat) || Math.abs(point.lat) > 90 || !Number.isFinite(point.lon) || Math.abs(point.lon) > 180 || (point.radiusM !== undefined && (!Number.isFinite(point.radiusM) || point.radiusM <= 0))) throw new Error('Invalid position');
      if (request.signal.aborted) return;
      lastPoint = { lat: point.lat, lon: point.lon, radiusM: point.radiusM ?? 4000, ts: timestamp(point.ts), mode: typeof point.mode === 'string' ? point.mode.trim().toLowerCase() : '' };
      dataState = 'positionReady';
      try { renderPoint(); } catch { mapState = 'mapError'; }
    } catch {
      dataState = (!mapVisible || document.hidden) ? 'positionPaused' : 'positionError';
    } finally {
      clearTimeout(timer);
      controller = null;
      renderStatus();
      schedulePosition(refreshPending ? 0 : pollDelay);
      refreshPending = false;
    }
  };
  const loadLibrary = () => new Promise((resolve, reject) => {
    if (window.maplibregl) { resolve(); return; }
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css';
    css.onerror = () => {};
    document.head.append(css);
    const script = document.createElement('script');
    const timer = setTimeout(() => reject(new Error('Library timeout')), startupTimeout);
    script.src = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js';
    script.onload = () => { clearTimeout(timer); window.maplibregl ? resolve() : reject(new Error('Missing library')); };
    script.onerror = () => { clearTimeout(timer); reject(new Error('Library error')); };
    document.head.append(script);
  });
  const initializeMap = async () => {
    try {
      await loadLibrary();
      map = new window.maplibregl.Map({ container: liveMap, style: 'https://tiles.openfreemap.org/styles/liberty', center: [fallbackCenter.lon, fallbackCenter.lat], zoom: 8, attributionControl: false, dragRotate: false, pitchWithRotate: false });
      map.addControl(new window.maplibregl.AttributionControl({ compact: true }), 'bottom-right');
      map.addControl(new window.maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      mapTimer = setTimeout(() => { mapState = 'mapError'; renderStatus(); }, startupTimeout);
      map.on('load', () => {
        clearTimeout(mapTimer);
        mapReady = true;
        mapState = 'mapReady';
        try { renderPoint(); } catch { mapState = 'mapError'; }
        renderStatus();
      });
      map.on('error', () => { clearTimeout(mapTimer); mapState = 'mapError'; renderStatus(); });
      map.on('webglcontextlost', () => { mapReady = false; mapState = 'mapError'; renderStatus(); });
      map.on('webglcontextrestored', () => {
        mapReady = true;
        mapState = 'mapReady';
        try { renderPoint(); } catch { mapState = 'mapError'; }
        renderStatus();
      });
    } catch {
      mapState = 'mapError';
      renderStatus();
    }
  };
  const scheduleFreshness = () => {
    clearTimeout(freshnessTimer);
    if (pageActive && mapVisible && !document.hidden) freshnessTimer = setTimeout(() => { renderStatus(); scheduleFreshness(); }, 60000);
  };
  const roadbookTimer = setTimeout(() => { roadbookState = 'mapError'; renderStatus(); }, startupTimeout);
  roadbook.addEventListener('load', () => { clearTimeout(roadbookTimer); roadbookState = 'mapReady'; renderStatus(); });
  roadbook.addEventListener('error', () => { clearTimeout(roadbookTimer); roadbookState = 'mapError'; renderStatus(); });
  liveFit.addEventListener('click', fitArea);
  document.addEventListener('panda-language-change', renderStatus);
  const updateMapActivity = () => {
    clearTimeout(pollTimer);
    clearTimeout(freshnessTimer);
    liveMap.dataset.active = String(mapVisible && !document.hidden && pageActive);
    if (!mapVisible || document.hidden || !pageActive) {
      controller?.abort(); map?.stop?.(); dataState = 'positionPaused'; renderStatus(); return;
    }
    if (!mapStarted) { mapStarted = true; mapState = 'mapLoading'; initializeMap(); }
    if (mapReady) renderPoint();
    refreshPending = Boolean(controller);
    fetchPosition(); scheduleFreshness();
  };
  document.addEventListener('visibilitychange', updateMapActivity);
  window.addEventListener('pagehide', () => { pageActive = false; updateMapActivity(); });
  window.addEventListener('pageshow', (event) => { if (event.persisted) { pageActive = true; updateMapActivity(); } });
  renderStatus();
  if ('IntersectionObserver' in window) {
    new window.IntersectionObserver(entries => { mapVisible = entries[0].isIntersecting; updateMapActivity(); }).observe(liveMap);
  } else updateMapActivity();
})();
