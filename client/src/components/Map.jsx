import React, { useState } from 'react';
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map(mapTrip) {
  // const position = [mapTrip.latitude, mapTrip.longitude];
  //const [trip, setTrip] = useState([props.mapTrip]);
  console.log('Contenido de mapTrip:', mapTrip);
  return (
    <div>
      <div key={trip.id}>
        <p> {trip.latitude} </p>
      </div>
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
