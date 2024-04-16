import React from 'react';
import * as Components from './ListingPage_Components'
import { useParams } from 'react-router-dom'
import buildObjectArray from './utils/BuildListingArray';
import GetListingJSON from './utils/GetListings';
import Navbar from './Navbar';
import {GoogleMap, Marker, useLoadScript} from '@react-google-maps/api';
import buildImageArray from './utils/BuildImageArray';
import CustomImage from './Image_Component';
import GetImageJSON from './utils/GetImages';
import './ListingPage.css';

export default function ListingPage() {
    const { id } = useParams();
    const idToFind = parseInt(id, 10);
    GetListingJSON();
    GetImageJSON(idToFind);
    const collection = buildObjectArray();
    const imageCollection = buildImageArray();

    const listing = collection.find(item => item.id === idToFind);
    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        const amOrPm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        const formattedMinutes = minutes.padStart(2, '0');
        return `${formattedHour}:${formattedMinutes} ${amOrPm}`;
    };

    const title = listing.title;
    const street_address = listing ? listing.street_address: '';
    const state = listing.state;
    const zip_code = listing.zip_code;
    const start_date = listing.start_date;
    const end_date = listing.end_date;
    const open_time = listing.open_time;
    const close_time = listing.close_time;
    const description = listing.description;
    const tag = listing.tag;
    const latitude = parseFloat(listing.latitude);
    const longitude = parseFloat(listing.longitude);

    const images = imageCollection.map(item=> (
        <CustomImage
            key={item.id}
            {...item}
            />
    ))
    function Maps() {
        const { isLoaded, loadError } = useLoadScript({
            googleMapsApiKey: 'AIzaSyAVPNguzZzl6ZCrE4jFBLl-fsYp9B6iT90' // Replace 'YOUR_API_KEY' with your actual Google Maps API key
        });
    
        const center = { lat: latitude, lng: longitude };
    
        if (loadError) return <div>Error loading maps</div>;
        if (!isLoaded) return <div>Loading maps</div>;
    
        return (
            <GoogleMap
                mapContainerStyle={{ width: '800px', height: '800px' }}
                zoom={18}
                center={center}
            >
                <Marker position={center} />
            </GoogleMap>
        );
      };

    return (
        <div className='listing-details'>
            <Navbar/>
            
            <div className='listing-container'>
            <Components.ScrollableContent>

            <Components.Container>
            <Components.Title>{title}</Components.Title>
            <Components.Title>Address:</Components.Title>
            <Components.Info>{street_address}, {state} {zip_code}</Components.Info>
            <Components.Title>Dates and Time:</Components.Title>
            <Components.Info>{formatDate(start_date)} to {formatDate(end_date)}</Components.Info>
            <Components.Info>{formatTime(open_time)} - {formatTime(close_time)}</Components.Info>
            <Components.Title>Description:</Components.Title>
            <Components.Info>{description}</Components.Info>
            <Components.Title>Tags:</Components.Title>
            <Components.Info>{tag}</Components.Info>
            <Components.Title>Pictures:</Components.Title>
            <div className = "images_container">
            {images}
            </div>

            </Components.Container>

            </Components.ScrollableContent>
            </div>

            <div className='map'>
                <Components.Map>
                    <Maps/>
                </Components.Map>
            </div>
      
        </div>
    );

}
