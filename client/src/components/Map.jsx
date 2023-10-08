import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function TravelProfile({ coordinates }) {
  const position = [coordinates.lat, coordinates.lng];

  return (
    <div>
      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Luogo del viaggio
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default TravelProfile;
