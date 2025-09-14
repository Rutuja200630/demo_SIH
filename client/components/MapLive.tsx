import { MapContainer, TileLayer, Circle, Polyline, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const pathCoords = [
  [26.8467, 80.9462],
  [26.9, 80.95],
  [26.92, 80.99],
  [26.89, 81.02],
  [26.87, 80.98]
];

export default function MapLive() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % pathCoords.length), 1500);
    return () => clearInterval(id);
  }, []);

  const current = pathCoords[idx];

  return (
    <div className="h-[360px] rounded-2xl overflow-hidden border border-white/10">
      <MapContainer center={[26.8467, 80.9462]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={pathCoords as any} color="#22d3ee" opacity={0.8} />
        <CircleMarker center={current as any} radius={10} pathOptions={{ color: "#a855f7", fillColor: "#a855f7", fillOpacity: 0.7 }} />
        <Circle center={[26.8467, 80.9462]} radius={2000} pathOptions={{ color: "#f59e0b", fillOpacity: 0.05 }} />
      </MapContainer>
    </div>
  );
}
