import { useEffect, useRef, useState } from "react";
import maplibregl, {
  type GeoJSONSource,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const WEBAPP_BASE =
  "https://script.google.com/macros/s/AKfycbxQfiZ1KIQHFH5tn7gPfkMI6-NMKUtj_uVgygG2eTaVDCW9dqIpm3bwV5TARlj6QBcz/exec";
const DEVICE_ID = "cavallo";
const DATA_URL = `${WEBAPP_BASE}?action=getLast&deviceId=${encodeURIComponent(
  DEVICE_ID,
)}`;

const DEFAULT_RADIUS_M = 4000;
const POLL_MS = 20000;
const START_ZOOM = 13;
const STALE_HOURS = 24;
const DEFAULT_CENTER = { lat: 45.57, lng: 10.24 };
const EARTH_R = 6371000;

const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "(c) OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
};

type CircleFeature = {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: Record<string, never>;
};

function toMs(ts: unknown) {
  if (ts == null) {
    return null;
  }

  if (typeof ts === "number") {
    return ts < 2e10 ? ts * 1000 : ts;
  }

  const numericValue = Number(ts);

  if (!Number.isNaN(numericValue)) {
    return numericValue < 2e10 ? numericValue * 1000 : numericValue;
  }

  const parsedValue = Date.parse(String(ts));
  return Number.isNaN(parsedValue) ? null : parsedValue;
}

function formatAge(tsMs: number | null) {
  if (!tsMs) {
    return "no-ts";
  }

  const diff = Date.now() - tsMs;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) {
    return "now";
  }

  if (minutes < 60) {
    return `${minutes}m`;
  }

  return `${Math.floor(minutes / 60)}h`;
}

function destPoint(
  lat: number,
  lng: number,
  bearingRad: number,
  distM: number,
) {
  const phi1 = (lat * Math.PI) / 180;
  const lambda1 = (lng * Math.PI) / 180;
  const delta = distM / EARTH_R;

  const sinPhi1 = Math.sin(phi1);
  const cosPhi1 = Math.cos(phi1);
  const sinDelta = Math.sin(delta);
  const cosDelta = Math.cos(delta);
  const sinTheta = Math.sin(bearingRad);
  const cosTheta = Math.cos(bearingRad);

  const sinPhi2 = sinPhi1 * cosDelta + cosPhi1 * sinDelta * cosTheta;
  const phi2 = Math.asin(sinPhi2);
  const y = sinTheta * sinDelta * cosPhi1;
  const x = cosDelta - sinPhi1 * sinPhi2;
  const lambda2 = lambda1 + Math.atan2(y, x);

  return {
    lat: (phi2 * 180) / Math.PI,
    lng: (lambda2 * 180) / Math.PI,
  };
}

function circlePolygon(lng: number, lat: number, radiusM: number, steps = 64) {
  const coords: number[][] = [];

  for (let index = 0; index <= steps; index += 1) {
    const bearing = (index / steps) * Math.PI * 2;
    const point = destPoint(lat, lng, bearing, radiusM);
    coords.push([point.lng, point.lat]);
  }

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [coords],
    },
    properties: {},
  } satisfies CircleFeature;
}

function bboxFromPolygon(feature: CircleFeature) {
  const coords = feature.geometry.coordinates[0];
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;

  coords.forEach(([lng, lat]) => {
    minLng = Math.min(minLng, lng);
    minLat = Math.min(minLat, lat);
    maxLng = Math.max(maxLng, lng);
    maxLat = Math.max(maxLat, lat);
  });

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ] as [[number, number], [number, number]];
}

export function LiveMapCanvas() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const fitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const container = containerRef.current;
    const fitButton = fitButtonRef.current;

    if (!wrap || !container || !fitButton) {
      return;
    }

    let cancelled = false;
    let map: maplibregl.Map | null = null;
    let marker: maplibregl.Marker | null = null;
    let pollId: number | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let cleanupFitButton: (() => void) | null = null;
    let cleanupWindowResize: (() => void) | null = null;
    let lastTsMs = 0;
    let lastCenterKey: string | null = null;
    let lastRadiusM = DEFAULT_RADIUS_M;

    const setBadge = (value: string) => {
      if (!cancelled && badgeRef.current) {
        badgeRef.current.textContent = value;
      }
    };

    const ensureMarker = (lat: number, lng: number) => {
      if (!map) {
        return;
      }

      if (!marker) {
        const element = document.createElement("div");
        element.className = "panda-marker";

        marker = new maplibregl.Marker({
          element,
          anchor: "center",
        })
          .setLngLat([lng, lat])
          .addTo(map);

        return;
      }

      marker.setLngLat([lng, lat]);
    };

    const ensureCircle = (lat: number, lng: number, radiusM: number) => {
      if (!map) {
        return;
      }

      const sourceId = "panda-circle-src";
      const polygon = circlePolygon(lng, lat, radiusM, 64);

      if (map.getSource(sourceId)) {
        (map.getSource(sourceId) as GeoJSONSource).setData(polygon);
        return;
      }

      map.addSource(sourceId, {
        type: "geojson",
        data: polygon,
      });

      map.addLayer({
        id: "panda-circle-fill",
        type: "fill",
        source: sourceId,
        paint: {
          "fill-color": "#ff3b30",
          "fill-opacity": 0.12,
        },
      });

      map.addLayer({
        id: "panda-circle-line",
        type: "line",
        source: sourceId,
        paint: {
          "line-color": "#ff3b30",
          "line-width": 1.6,
          "line-opacity": 0.35,
        },
      });
    };

    const fitCircle = (lat: number, lng: number, radiusM: number) => {
      if (!map) {
        return;
      }

      const polygon = circlePolygon(lng, lat, radiusM, 48);
      const bounds = bboxFromPolygon(polygon);

      map.fitBounds(bounds, {
        padding: 24,
        duration: 350,
        maxZoom: 16,
      });
    };

    const fetchPublic = async () => {
      const response = await fetch(DATA_URL, { cache: "no-store" });
      const payload = await response.json();

      if (!payload || payload.ok !== true) {
        throw new Error(payload?.err || "bad payload");
      }

      if (typeof payload.lat !== "number" || typeof payload.lon !== "number") {
        throw new Error("missing lat/lon");
      }

      return {
        lat: payload.lat,
        lng: payload.lon,
        ts: toMs(payload.ts),
        mode: String(payload.mode || ""),
        radiusM:
          typeof payload.radiusM === "number" ? payload.radiusM : DEFAULT_RADIUS_M,
      };
    };

    const forceResize = () => {
      if (!map || cancelled) {
        return;
      }

      try {
        map.resize();
      } catch {
        // Ignore resize errors while mounting.
      }
    };

    const update = async () => {
      try {
        const point = await fetchPublic();

        if (point.ts) {
          lastTsMs = point.ts;
        }

        lastRadiusM = point.radiusM;

        const centerKey = `${point.lat.toFixed(6)},${point.lng.toFixed(
          6,
        )},${point.radiusM}`;

        if (centerKey !== lastCenterKey) {
          ensureMarker(point.lat, point.lng);
          ensureCircle(point.lat, point.lng, point.radiusM);
          lastCenterKey = centerKey;
        }

        const staleMs = STALE_HOURS * 3600 * 1000;
        const isStale = lastTsMs && Date.now() - lastTsMs > staleMs;
        const modeText = point.mode ? ` - ${point.mode.toLowerCase()}` : "";

        setBadge(
          `${isStale ? "stale" : "live"} - ${formatAge(lastTsMs)}${modeText} - r:${Math.round(
            point.radiusM / 1000,
          )}km`,
        );
      } catch (fetchError) {
        setBadge("no data");
        console.warn("[panda live map]", fetchError);
      }
    };

    setBadge("loading...");

    void (async () => {
      try {
        let initLat = DEFAULT_CENTER.lat;
        let initLng = DEFAULT_CENTER.lng;

        try {
          const point = await fetchPublic();
          initLat = point.lat;
          initLng = point.lng;
          if (point.ts) {
            lastTsMs = point.ts;
          }
          lastRadiusM = point.radiusM;
        } catch {
          // Keep fallback center if live data is temporarily unavailable.
        }

        if (cancelled) {
          return;
        }

        map = new maplibregl.Map({
          container,
          style: MAP_STYLE,
          center: [initLng, initLat],
          zoom: START_ZOOM,
          attributionControl: false,
          dragRotate: false,
          pitchWithRotate: false,
          renderWorldCopies: true,
        });

        map.addControl(
          new maplibregl.AttributionControl({ compact: true }),
          "bottom-right",
        );
        map.addControl(
          new maplibregl.NavigationControl({ showCompass: false }),
          "top-right",
        );

        map.on("load", () => {
          if (cancelled) {
            return;
          }

          ensureMarker(initLat, initLng);
          ensureCircle(initLat, initLng, lastRadiusM);
          fitCircle(initLat, initLng, lastRadiusM);
          forceResize();
          window.setTimeout(forceResize, 120);
          window.setTimeout(forceResize, 360);

          const handleFitClick = () => {
            const current = marker
              ? marker.getLngLat()
              : { lat: initLat, lng: initLng };
            fitCircle(current.lat, current.lng, lastRadiusM);
          };

          fitButton.addEventListener("click", handleFitClick);
          cleanupFitButton = () =>
            fitButton.removeEventListener("click", handleFitClick);

          resizeObserver = new ResizeObserver(() => {
            forceResize();
          });
          resizeObserver.observe(wrap);

          window.addEventListener("resize", forceResize);
          cleanupWindowResize = () =>
            window.removeEventListener("resize", forceResize);

          void update();
          pollId = window.setInterval(() => {
            void update();
          }, POLL_MS);
        });

        map.on("error", (event) => {
          console.warn("[panda live map]", event?.error ?? event);
        });
      } catch (loadError) {
        if (!cancelled) {
          setError("Live map non disponibile.");
          setBadge("no data");
          console.warn("[panda live map]", loadError);
        }
      }
    })();

    return () => {
      cancelled = true;
      cleanupFitButton?.();
      cleanupWindowResize?.();
      resizeObserver?.disconnect();

      if (pollId !== null) {
        window.clearInterval(pollId);
      }

      map?.remove();
    };
  }, []);

  return (
    <div className="live-map-page__frame">
      {error ? <p className="live-map-page__fallback">{error}</p> : null}
      <div className="panda-map-wrap" ref={wrapRef}>
        <div
          aria-label="Mappa posizione Panda"
          className="panda-map"
          ref={containerRef}
        />
        <button className="panda-btn" ref={fitButtonRef} type="button">
          Ritrova la Panda
        </button>
        <div className="panda-badge" ref={badgeRef}>
          loading...
        </div>
      </div>
    </div>
  );
}
