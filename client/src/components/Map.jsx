import React from 'react';
import { TileLayer, Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'



function Map(mapTrip) {
  const position = [mapTrip.mapTrip.latitude, mapTrip.mapTrip.longitude];
  console.log('Contenido de mapTrip:', mapTrip, mapTrip.mapTrip.latitude);
  return (
    <div>
      {/* <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
              Viaje
          </Popup>
        </Marker>
      </MapContainer> */}
    </div>

  );
}

export default Map;
