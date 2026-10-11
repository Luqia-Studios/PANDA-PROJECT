import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../public/proposta-partner/maps/maps.js', import.meta.url), 'utf8');
const flush = () => new Promise((resolve) => setImmediate(resolve));
const initialTime = Date.parse('2026-10-11T12:00:00Z');

async function harness(options = {}) {
  let now = initialTime, timerId = 0, calls = 0, concurrent = 0, maxConcurrent = 0;
  const timers = new Map(), listeners = {}, mapEvents = {}, sources = {}, fits = [];
  class Element {
    constructor() { this.children = []; this.dataset = {}; this._text = ''; }
    set textContent(value) { this._text = value; this.children = []; }
    get textContent() { return this._text + this.children.map((child) => typeof child === 'string' ? child : child.textContent).join(''); }
    append(...children) { this.children.push(...children); }
    replaceChildren(...children) { this._text = ''; this.children = children; }
    addEventListener(type, callback) { this[type] = callback; }
  }
  const ids = ['live-map', 'live-map-fit', 'live-map-state', 'live-data-state', 'live-freshness', 'live-updated', 'roadbook-map', 'roadbook-status'];
  const nodes = Object.fromEntries(ids.map((id) => [id, new Element()]));
  const document = { hidden: false, documentElement: { lang: 'it' }, querySelector: (selector) => nodes[selector.slice(1)], querySelectorAll: () => [], createElement: () => new Element(), addEventListener: (type, callback) => { listeners[type] = callback; }, head: { append: (script) => { if (options.library !== 'hang') queueMicrotask(() => script.onerror()); } } };
  class MapMock {
    constructor() { if (options.webglError) throw new Error('WebGL unavailable'); }
    addControl() {}
    on(type, callback) { mapEvents[type] = callback; if (type === 'load' && !options.mapHang) queueMicrotask(callback); }
    getSource(id) { return sources[id]; }
    addSource(id, data) { sources[id] = { data: data.data, setData(value) { this.data = value; } }; }
    addLayer() {}
    fitBounds(bounds, settings) { fits.push(settings); }
  }
  class MarkerMock { setLngLat() { return this; } addTo() { return this; } }
  class BoundsMock { extend() { return this; } }
  const library = { Map: MapMock, Marker: MarkerMock, LngLatBounds: BoundsMock, AttributionControl: class {}, NavigationControl: class {} };
  const window = { maplibregl: options.library ? undefined : library, addEventListener: (type, callback) => { listeners[type] = callback; } };
  if (options.observeVisibility) window.IntersectionObserver = class {
    constructor(callback) { listeners.intersection = callback; }
    observe() {}
  };
  const clock = { setTimeout(fn, delay) { const id = ++timerId; timers.set(id, { fn, at: now + delay }); return id; }, clearTimeout(id) { timers.delete(id); } };
  class ClockDate extends Date { static now() { return now; } }
  const fetch = async (url, { signal }) => {
    assert.equal(new URL(url).searchParams.get('action'), 'getLast');
    calls++; concurrent++; maxConcurrent = Math.max(maxConcurrent, concurrent);
    try {
      if (options.hanging) await new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(new Error('Aborted')), { once: true }));
      if (options.delay) await new Promise((resolve, reject) => { clock.setTimeout(resolve, options.delay); signal.addEventListener('abort', () => reject(new Error('Aborted')), { once: true }); });
      if (options.networkError) throw new Error('Offline');
      return { ok: !options.httpError, json: async () => {
        if (options.jsonError) throw new Error('Invalid JSON');
        return options.point ?? { ok: true, lat: 45.57, lon: 10.24, radiusM: 4000, ts: initialTime - 60000 };
      } };
    } finally { concurrent--; }
  };
  vm.runInNewContext(source, { window, document, Date: ClockDate, Intl, Number, String, Math, Array, Promise, Error, AbortController, fetch, ...clock });
  await flush();
  return {
    nodes, sources, fits, mapEvents,
    get calls() { return calls; }, get maxConcurrent() { return maxConcurrent; },
    async advance(ms) {
      const target = now + ms;
      while (true) {
        const entry = [...timers.entries()].filter(([, timer]) => timer.at <= target).sort((a, b) => a[1].at - b[1].at)[0];
        if (!entry) break;
        now = entry[1].at; timers.delete(entry[0]); entry[1].fn(); await flush();
      }
      now = target; await flush();
    },
    async visibility(hidden) { document.hidden = hidden; listeners.visibilitychange(); await flush(); },
    async intersection(visible) { listeners.intersection([{ isIntersecting:visible }]); await flush(); },
    async pagehide() { listeners.pagehide(); await flush(); }
  };
}

test('defers the live map until visible and suspends polling outside the viewport', async () => {
  const h = await harness({ observeVisibility:true });
  assert.equal(h.calls, 0);
  assert.equal(h.fits.length, 0);
  assert.match(h.nodes['live-map-state'].textContent, /quando è visibile/);
  await h.advance(60000);
  assert.equal(h.calls, 0);
  await h.intersection(true);
  assert.equal(h.calls, 1);
  assert.equal(h.fits.length, 1);
  await h.intersection(false);
  await h.advance(60000);
  assert.equal(h.calls, 1);
  assert.equal(h.nodes['live-data-state'].textContent, 'Aggiornamenti sospesi');
  await h.intersection(true);
  assert.equal(h.calls, 2);
  assert.equal(h.maxConcurrent, 1);
});

test('uses the received timestamp, keeps the original area and fits only a real position', async () => {
  const h = await harness();
  assert.equal(h.nodes['live-map-state'].textContent, 'Mappa disponibile');
  assert.match(h.nodes['live-freshness'].textContent, /Posizione recente/);
  assert.equal(h.nodes['live-updated'].children[1].dateTime, '2026-10-11T11:59:00.000Z');
  const ring = h.sources['panda-circle-src'].data.geometry.coordinates[0];
  assert.equal(ring.length, 65);
  assert.ok(Math.abs(ring[0][1] - (45.57 + 4000 / 6371000 * 180 / Math.PI)) < 1e-9);
  assert.equal(h.fits[0].maxZoom, 16);
  assert.equal(h.nodes['live-map-fit'].disabled, false);
});

test('distinguishes old, missing and future timestamps; accepts seconds and numeric strings', async () => {
  for (const ts of [(initialTime - 3600000) / 1000, String((initialTime - 3600000) / 1000)]) {
    const h = await harness({ point: { ok: true, lat: 45, lon: 10, ts } });
    assert.match(h.nodes['live-freshness'].textContent, /Dati non aggiornati/);
    assert.equal(h.nodes['live-updated'].children[1].dateTime, '2026-10-11T11:00:00.000Z');
  }
  for (const ts of [undefined, 'invalid', initialTime + 3600000]) {
    const h = await harness({ point: { ok: true, lat: 45, lon: 10, ts } });
    assert.match(h.nodes['live-freshness'].textContent, /Data di aggiornamento non disponibile/);
    assert.equal(h.nodes['live-updated'].children.length, 0);
  }
});

test('library failures, WebGL failures and map startup timeout exit loading', async () => {
  for (const options of [{ library: 'error' }, { library: 'hang' }, { webglError: true }, { mapHang: true }]) {
    const h = await harness(options);
    await h.advance(15000);
    assert.match(h.nodes['live-map-state'].textContent, /Mappa non disponibile/);
    assert.equal(h.nodes['live-data-state'].textContent, 'Posizione disponibile');
    assert.equal(h.nodes['live-map-fit'].disabled, true);
  }
});

test('HTTP, JSON, network, malformed position and request timeout exit loading', async () => {
  for (const options of [{ httpError: true }, { jsonError: true }, { networkError: true }, { point: { ok: false } }, { point: { ok: true, lat: 91, lon: 10 } }, { hanging: true }]) {
    const h = await harness(options);
    await h.advance(10000);
    assert.equal(h.nodes['live-data-state'].textContent, 'Aggiornamento della posizione non riuscito.');
    assert.equal(h.nodes['live-map-fit'].disabled, true);
  }
});

test('polls after completion, avoids overlap and stops when hidden or leaving the page', async () => {
  const h = await harness({ delay: 8000 });
  await h.advance(20000);
  assert.equal(h.calls, 1);
  await h.advance(8000);
  assert.equal(h.calls, 2);
  await h.visibility(true);
  await h.advance(90000);
  assert.equal(h.calls, 2);
  await h.visibility(false);
  assert.equal(h.calls, 3);
  await h.advance(8000);
  assert.equal(h.maxConcurrent, 1);
  await h.pagehide();
  await h.advance(90000);
  assert.equal(h.calls, 3);
});

test('keeps the last good position after a failed update and ages it locally', async () => {
  const options = {};
  const h = await harness(options);
  options.networkError = true;
  await h.advance(20000);
  assert.match(h.nodes['live-data-state'].textContent, /non riuscito/);
  assert.equal(h.nodes['live-updated'].children[1].dateTime, '2026-10-11T11:59:00.000Z');
  await h.advance(30 * 60000);
  assert.match(h.nodes['live-freshness'].textContent, /Dati non aggiornati/);
  h.mapEvents.webglcontextlost();
  assert.equal(h.nodes['live-map-fit'].disabled, true);
});
