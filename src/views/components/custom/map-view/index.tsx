import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

interface MapViewProps {
  position: [number, number]; // Tuple with latitude and longitude
  width?: string;
  height?: string;
}

// Define your custom icon
const customIcon = new L.Icon({
  iconUrl: '/images/icons/map-pins/building-marker.png', // Replace with the path to your custom icon
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32] // Popup position relative to the icon
});

const MapView: React.FC<MapViewProps> = ({ position, width = '100%', height = '300px' }) => {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height, width }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <span>
            Location: {position[0]}, {position[1]}
          </span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
