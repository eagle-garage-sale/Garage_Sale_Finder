import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';
import {useMemo} from 'react';
import "./Maps.css"


const Maps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAVPNguzZzl6ZCrE4jFBLl-fsYp9B6iT90',
  });

  const center = useMemo(() => ({ lat: 33.206379, lng: -97.151047 }), []);

  return (
    <div className="Maps">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{lat: 33.206379, lng: -97.151047}} />
          </GoogleMap>
      )}
    </div>
  );
};

export default Maps;