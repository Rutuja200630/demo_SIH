import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";

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
    <div className="relative w-full h-full">
      <MapContainer center={[22.9734, 78.6569] as any} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {filtered.map((h) => (
          <Marker key={h.name} position={[h.lat, h.lng] as any} icon={icon}>
            <Tooltip direction="top" offset={[0, -6] as any} opacity={1} permanent={false} sticky>
              <div className="text-xs">
                <div className="font-semibold">{h.name}</div>
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
      <div className="absolute top-3 left-3 z-[1000] bg-white/80 dark:bg-black/60 backdrop-blur rounded-xl border border-white/20 shadow px-3 py-2 flex items-center gap-3">
        <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={showSafe} onChange={(e) => setShowSafe(e.target.checked)} /> Safe zones</label>
        <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={showAlerts} onChange={(e) => setShowAlerts(e.target.checked)} /> Alerts</label>
        <select aria-label="Filter by region" value={region} onChange={(e) => setRegion(e.target.value as Region)} className="text-xs bg-transparent outline-none">
          <option>All</option>
          <option>North</option>
          <option>South</option>
          <option>West</option>
          <option>East</option>
        </select>
      </div>
    </div>
  );
}
