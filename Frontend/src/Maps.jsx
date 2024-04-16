import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow} from '@react-google-maps/api';
import buildObjectArray from './utils/BuildListingArray';
import MapMarker from './assets/images/little.png'
import SaleMarker from './assets/images/sign.png'

const Maps = () => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { timeZone: 'UTC' }; // Specify the time zone as UTC
    return date.toLocaleDateString('en-US', options);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAVPNguzZzl6ZCrE4jFBLl-fsYp9B6iT90',
  });

  const collection = buildObjectArray();

  const infoWindowSize = { width: '300px', height: '250px' };

  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

  const getDirectionsLink = (marker) => {
    if (!userLocation) return '';
    const origin = `${userLocation.lat},${userLocation.lng}`;
    const dest = `${marker.latitude},${marker.longitude}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`;
  };

  // Center of the map (fallback if user location not available)
  const center = { lat: 33.206379, lng: -97.151047 };

  const markers = collection.map(function(item) {
    const latitude = Number(item.latitude);
    const longitude = Number(item.longitude);
    return (
      <Marker
      key = {item.id}
      position={{lat: latitude, lng: longitude}} 
      onClick={() => handleMarkerClick(item)}
      icon={{
        url: SaleMarker,
        scaledSize: { width: 30, height: 30 }, // Adjust the size as needed
      }}/>
    )
  })

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  useEffect(() => {
    getPosition();
  }, []);

  return (
    <div style={{ height: '95%', width: '100%', overflow: 'hidden' }}>
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          zoom={15}
          center={userLocation || center}
          onLoad={(map) => setMap(map)}
        >
          {markers}
          {userLocation && <Marker position={userLocation}
              icon={{
                url: MapMarker,
                scaledSize: { width: 40, height: 40 }, // Adjust the size as needed
              }}
            />}
            {selectedMarker && (
            <InfoWindow
              position={{ lat: Number(selectedMarker.latitude), lng: Number(selectedMarker.longitude) }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style ={{...infoWindowSize}}>
                <h2>{selectedMarker.street_address}</h2>
                <p>{formatDate(selectedMarker.start_date)} to {formatDate(selectedMarker.end_date)}</p>
                <p><strong>{selectedMarker.title}</strong></p>
                <p>{selectedMarker.description}</p>
                <a href={getDirectionsLink(selectedMarker)} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default Maps;
