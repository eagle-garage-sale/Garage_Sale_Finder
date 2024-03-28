import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const Maps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: '', // Replace with your Google Maps API key
  });

  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Function to get user's current location
  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          if (map) {
            map.panTo({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Center of the map (fallback if user location not available)
  const center = { lat: 33.206379, lng: -97.151047 };

  return (
    <div style={{ height: '95%', width: '100%' }}>
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          zoom={15}
          center={userLocation || center}
          onLoad={(map) => setMap(map)}
        >
          {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
      )}
      <button onClick={getPosition}>Get My Location</button>
    </div>
  );
};

export default Maps;
