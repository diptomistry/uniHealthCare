import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 23.7286869,
  lng: 90.3967359,
};

const MapComponent = () => {
  return (
    
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20}>
        <Marker position={center} />
      </GoogleMap>
 
  );
};

export default MapComponent;
