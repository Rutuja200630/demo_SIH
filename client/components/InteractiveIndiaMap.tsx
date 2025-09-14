import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const hotspots = [
  { name: "Taj Mahal", city: "Agra", lat: 27.1751, lng: 78.0421, safety: 86, density: "Medium" },
  { name: "Qutub Minar", city: "Delhi", lat: 28.5244, lng: 77.1855, safety: 74, density: "High" },
  { name: "Gateway of India", city: "Mumbai", lat: 18.922, lng: 72.8347, safety: 81, density: "High" },
  { name: "Konark Sun Temple", city: "Puri", lat: 19.8876, lng: 86.0945, safety: 79, density: "Low" },
  { name: "Hampi", city: "Karnataka", lat: 15.335, lng: 76.460, safety: 88, density: "Low" },
];

export default function InteractiveIndiaMap() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Tourist Hotspots</h2>
        <div className="h-[360px] rounded-2xl overflow-hidden border border-white/10">
          <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hotspots.map((h) => (
              <CircleMarker key={h.name} center={[h.lat, h.lng]} radius={10} pathOptions={{ color: "hsl(28 90% 55%)", fillColor: "hsl(28 90% 55%)", fillOpacity: 0.7 }}>
                <Tooltip direction="top" offset={[0, -6]} opacity={1} permanent={false} sticky>
                  <div className="text-xs">
                    <div className="font-semibold">{h.name}</div>
                    <div className="opacity-70">{h.city}</div>
                    <div>Safety Score: <span className="font-medium">{h.safety}</span></div>
                    <div>Tourist Density: <span className="font-medium">{h.density}</span></div>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
