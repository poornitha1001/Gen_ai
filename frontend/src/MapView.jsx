import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// custom icons
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32]
});
const orangeIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  iconSize: [32, 32]
});
const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32]
});

function getIcon(status) {
  if (status === "Resolved") return greenIcon;
  if (status === "In Progress") return orangeIcon;
  return redIcon;
}

function MapView() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/complaints")
      .then(res => res.json())
      .then(data => setComplaints(data));
  }, []);

  return (
    <div style={{ height: 400, margin: 20 }}>
      <h3 style={{ textAlign: "center" }}>Live Civic Issues Map</h3>
      <MapContainer center={[11.0168, 76.9558]} zoom={13} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {complaints.map(c => (
          c.location && (
            <Marker
              key={c._id}
              position={[c.location.lat, c.location.lng]}
              icon={getIcon(c.status)}
            >
              <Popup>
                <b>{c.area}</b><br />
                {c.text}<br />
                <b>Status:</b> {c.status}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;

