import React, { useState } from 'react'
import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: 23.777176,
    lng: 90.399452
};

function Direction({direction}) {

    const [directionResponse, setDirectionResponse] = useState(null);
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDjuwKO2DTqK5ZZkmv7L8X7vOUWj_ift0s"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >

                <DirectionsService
                    // required
                    options={{ 
                        destination: direction.toLocation + ' Dhaka Bangladesh',
                        origin: direction.fromLocation +' Dhaka Bangladesh',
                        travelMode: 'DRIVING'
                    }}
                    
                    // required
                    callback={res => {
                        if (res !== null) {
                            setDirectionResponse(res);
                        }
                    }}
                />

                {
                    directionResponse && <DirectionsRenderer
                        // required
                        options={{ 
                            directions: directionResponse
                        }}
                    />
                }

            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Direction)