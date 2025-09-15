import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useMemo, useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Helper for native names (bilingual)
function nativeName(name: string): string {
  const map: Record<string, string> = {
    "Agra": "आगरा",
    "Jaipur": "जयपुर",
    "Goa": "गोवा",
    "Kerala": "केरल",
    "Darjeeling": "दार्जिलिंग",
    "Rishikesh": "ऋषिकेश",
    "Varanasi": "वाराणसी",
  };
  return map[name] || name;
}


const spots = [
  { name: "Agra", city: "Agra", lat: 27.1751, lng: 78.0421, safety: 86, incidents: 2, crowd: "Medium", verifiedNearby: 41 },
  { name: "Jaipur", city: "Jaipur", lat: 26.9124, lng: 75.7873, safety: 82, incidents: 1, crowd: "High", verifiedNearby: 37 },
  { name: "Goa", city: "Goa", lat: 15.2993, lng: 74.1240, safety: 78, incidents: 4, crowd: "High", verifiedNearby: 63 },
  { name: "Kerala", city: "Kochi", lat: 9.9312, lng: 76.2673, safety: 90, incidents: 0, crowd: "Low", verifiedNearby: 12 },
  { name: "Darjeeling", city: "Darjeeling", lat: 27.0360, lng: 88.2627, safety: 84, incidents: 1, crowd: "Medium", verifiedNearby: 18 },
  { name: "Rishikesh", city: "Rishikesh", lat: 30.0869, lng: 78.2676, safety: 88, incidents: 0, crowd: "Medium", verifiedNearby: 15 },
  { name: "Varanasi", city: "Varanasi", lat: 25.3176, lng: 82.9739, safety: 76, incidents: 3, crowd: "High", verifiedNearby: 28 },
];

type Region = "All" | "North" | "South" | "West" | "East";

function regionOf(lat: number, lng: number): Region {
  if (lat >= 23 && lng < 80) return "West";
  if (lat >= 23 && lng >= 80) return "North";
  if (lat < 23 && lng >= 80) return "East";
  return "South";
}

export default function MapHero() {
  const [region, setRegion] = useState<Region>("All");
  const [showSafe, setShowSafe] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [satellite, setSatellite] = useState(false);
  const [menuHidden, setMenuHidden] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0, dragging: false, offsetX: 0, offsetY: 0 });

  useEffect(() => {
  const el = menuRef.current;
  const wrap = wrapperRef.current;
  const handle = handleRef.current || el;
  if (!el || !handle || !wrap) return;

    function startDrag(clientX: number, clientY: number) {
      pos.current.dragging = true;
      const rect = el.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      pos.current.offsetX = clientX - rect.left;
      pos.current.offsetY = clientY - rect.top;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseDown(e: MouseEvent) {
      // only start drag for primary button
      if (e.button !== 0) return;
      startDrag(e.clientX, e.clientY);
    }

    function onMouseMove(e: MouseEvent) {
      if (!pos.current.dragging) return;
      const wrapRect = wrap.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      let left = e.clientX - pos.current.offsetX - wrapRect.left;
      let top = e.clientY - pos.current.offsetY - wrapRect.top;
      // clamp inside wrapper
      left = Math.max(8, Math.min(left, wrap.clientWidth - elRect.width - 8));
      top = Math.max(8, Math.min(top, wrap.clientHeight - elRect.height - 8));
      pos.current.x = left;
      pos.current.y = top;
      el.style.transform = 'none';
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    }

    function onMouseUp() {
      pos.current.dragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);
    }

    function onTouchMove(e: TouchEvent) {
      if (!pos.current.dragging) return;
      e.preventDefault();
      const t = e.touches[0];
      const wrapRect = wrap.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      let left = t.clientX - pos.current.offsetX - wrapRect.left;
      let top = t.clientY - pos.current.offsetY - wrapRect.top;
      left = Math.max(8, Math.min(left, wrap.clientWidth - elRect.width - 8));
      top = Math.max(8, Math.min(top, wrap.clientHeight - elRect.height - 8));
      pos.current.x = left;
      pos.current.y = top;
      el.style.transform = 'none';
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    }

    function onTouchEnd() {
      pos.current.dragging = false;
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    }

  handle.addEventListener('mousedown', onMouseDown as any);
  handle.addEventListener('touchstart', onTouchStart as any, { passive: true } as any);

    // load persisted position (relative to wrapper)
    try {
      const saved = localStorage.getItem('mapMenuPos');
      if (saved) {
        const p = JSON.parse(saved);
        const wrapRect = wrap.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        let left = p.x || Math.max(8, (wrap.clientWidth - elRect.width) / 2);
        let top = p.y || 12;
        left = Math.max(8, Math.min(left, wrap.clientWidth - elRect.width - 8));
        top = Math.max(8, Math.min(top, wrap.clientHeight - elRect.height - 8));
        pos.current.x = left;
        pos.current.y = top;
        el.style.transform = 'none';
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
      } else {
        // center top by default
        const elRect = el.getBoundingClientRect();
        const left = Math.max(8, (wrap.clientWidth - elRect.width) / 2);
        const top = 12;
        pos.current.x = left;
        pos.current.y = top;
        el.style.transform = 'none';
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
      }
    } catch {}

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuHidden(true);
    }
    document.addEventListener('keydown', onKeyDown);

    return () => {
      handle.removeEventListener('mousedown', onMouseDown as any);
      handle.removeEventListener('touchstart', onTouchStart as any);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove as any);
      document.removeEventListener('touchend', onTouchEnd as any);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // persist position on change
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const save = () => {
      try { localStorage.setItem('mapMenuPos', JSON.stringify({ x: pos.current.x, y: pos.current.y })); } catch {}
    };
    window.addEventListener('beforeunload', save);
    return () => window.removeEventListener('beforeunload', save);
  }, []);

  const icon = useMemo(() =>
    L.divIcon({
      className: "",
      html: `<div class=\"pulse-marker\"><span class=\"pulse-dot\"></span><span class=\"pulse-wave\"></span></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    }), []);

  const filtered = spots.filter((s) => {
    const r = region === "All" || regionOf(s.lat, s.lng) === region;
    const safe = s.safety >= 80;
    return r && ((showSafe && safe) || (showAlerts && !safe));
  });

  return (
    <div ref={wrapperRef} className="relative w-full h-full fade-in">
      <MapContainer center={[22.9734, 78.6569] as any} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
        <TileLayer
          url={satellite
            ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          attribution={satellite
            ? "Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            : "&copy; OpenStreetMap contributors"}
        />
        {filtered.map((h) => (
          <Marker key={h.name} position={[h.lat, h.lng] as any} icon={icon}>
            <Tooltip direction="top" offset={[0, -6] as any} opacity={1} permanent={false} sticky>
              <div className="text-xs">
                <div className="font-semibold">{h.name} <span className="opacity-70">({nativeName(h.name)})</span></div>
                <div className="opacity-70">{h.city}</div>
                <div>Safety Score: <span className="font-medium">{h.safety}</span></div>
                <div>Recent Incidents: <span className="font-medium">{h.incidents}</span></div>
                <div>Crowd Level: <span className="font-medium">{h.crowd}</span></div>
                <div>Verified Tourists Nearby: <span className="font-medium">{h.verifiedNearby}</span></div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      {/* Enhanced menu UI */}
      {menuHidden ? (
        <button aria-label="Show map menu" onClick={(e) => { e.stopPropagation(); setMenuHidden(false); }} className="menu-show-button absolute top-4 left-4 z-[1100] bg-white/90 hover:bg-white text-slate-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110">
          <span className="text-sm font-medium">☰</span>
        </button>
      ) : null}

  <div role="region" aria-label="Map controls" ref={menuRef} style={{ position: 'absolute' }} className={`map-menu menu-pop ${menuHidden ? 'map-menu-hidden' : ''} z-[1000] bg-white/5 backdrop-blur rounded-lg border border-white/10 shadow px-3 py-2 flex items-center gap-3 text-sm text-white/90`}>
  <div ref={handleRef} aria-hidden className="drag-handle flex items-center justify-center w-7 h-7 rounded-md bg-white/6 text-white cursor-grab">≡</div>
        <button aria-label="Hide menu" onClick={(e) => { e.stopPropagation(); setMenuHidden(true); }} className="ml-1 -mr-1 bg-transparent text-white/90 rounded p-1">▾</button>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showSafe} onChange={(e) => setShowSafe(e.target.checked)} className="accent-green-400" />
          <span className="opacity-90">Safe</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showAlerts} onChange={(e) => setShowAlerts(e.target.checked)} className="accent-rose-400" />
          <span className="opacity-90">Alerts</span>
        </label>
        <select aria-label="Region" value={region} onChange={(e) => setRegion(e.target.value as Region)} className="bg-transparent text-white/90 rounded px-2 py-1 border border-white/5">
          <option>All</option>
          <option>North</option>
          <option>South</option>
          <option>West</option>
          <option>East</option>
        </select>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={satellite} onChange={(e) => setSatellite(e.target.checked)} className="accent-indigo-400" />
          <span className="opacity-90">Sat</span>
        </label>
      </div>
    </div>
  );
}
