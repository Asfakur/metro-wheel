import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 23.777176,
  lng: 90.399452
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDjuwKO2DTqK5ZZkmv7L8X7vOUWj_ift0s"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)