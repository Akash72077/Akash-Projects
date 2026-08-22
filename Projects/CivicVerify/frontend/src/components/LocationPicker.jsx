import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";

function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(event) {
      onSelect(event.latlng.lat, event.latlng.lng);
    }
  });

  return null;
}

export default function LocationPicker({ latitude, longitude, onSelect }) {
  const initialPosition =
    latitude && longitude
      ? [Number(latitude), Number(longitude)]
      : [17.385044, 78.486671];

  const [selectedPosition, setSelectedPosition] = useState(initialPosition);

  useEffect(() => {
    if (latitude && longitude) {
      setSelectedPosition([Number(latitude), Number(longitude)]);
    }
  }, [latitude, longitude]);

  const handleSelect = (lat, lng) => {
    setSelectedPosition([lat, lng]);
    onSelect(lat, lng);
  };

  return (
    <div className="map-box">
      <MapContainer center={selectedPosition} zoom={13} scrollWheelZoom={true} style={{ height: "260px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onSelect={handleSelect} />
        <Marker position={selectedPosition} />
      </MapContainer>
      <p className="muted">Click on the map to choose the exact complaint location.</p>
    </div>
  );
}
