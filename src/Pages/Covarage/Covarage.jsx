import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// Import or define your district data
import districtData from "../../../public/warehouses.json"; // you can also inline it directly if needed

const Covarage = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center mb-6">Check Delivery Coverage</h2>

      <div className="max-w-xl mx-auto flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter your area or district"
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Search
        </button>
      </div>

      <h3 className="text-xl font-semibold text-center mb-4">
        We almost deliver all over Bangladesh
      </h3>

      <div className="h-[600px] max-w-6xl mx-auto rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          />

          {districtData.map((district, idx) => (
            <Marker
              key={idx}
              position={[district.latitude, district.longitude]}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{district.city}</strong>
                  <br />
                  <span>District: {district.district}</span>
                  <br />
                  <span>Status: {district.status}</span>
                  <br />
                  <span>Covered: {district.covered_area.join(", ")}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Covarage;
