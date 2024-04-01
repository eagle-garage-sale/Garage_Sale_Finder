import React, { Component, useState} from "react";
import { Link } from 'react-router-dom';
import * as Components from './Login_Components';

export default function ShowListing(props)
{
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        const amOrPm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        const formattedMinutes = minutes.padStart(2, '0');
        return `${formattedHour}:${formattedMinutes} ${amOrPm}`;
    };

    const data = { name: 'Oz'};

    return (
        <div className='listing-details' key={props.id}>
            <Link to={{ pathname: `/listingpage/${props.id}`, state: data }}>
            <h3>
                 {props.street_address}, {props.state}
            </h3>
            </Link>
            <p>
                {formatDate(props.start_date)} - {formatDate(props.end_date)}
            </p>
            <p>
                Hours: {formatTime(props.open_time)} - {formatTime(props.close_time)}
            </p>
            <p>
                {props.description}
            </p>
            <p>
                Tags: {props.tag}
            </p>
        </div>
    );

}

/*"{"id": 1,
 "street_address": "1191 Taney St",
  "state": "OR", 
  "city": "Eugene", 
  "zip_code": "97401", 
  "user_id": 0, 
  "start_date": "string", 
  "end_date": "string", 
  "open_time": "string", 
  "close_time": "string", 
  "description": "string", 
  "latitude": "44.073796", 
  "longitude": "-123.16025"}"*/