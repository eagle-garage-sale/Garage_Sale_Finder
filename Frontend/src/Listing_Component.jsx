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
    // Convert hours to integer
    const hour = parseInt(hours, 10);
    // Determine AM/PM based on hour
    const amOrPm = hour >= 12 ? 'PM' : 'AM';
    // Convert hour from military time to standard time
    const formattedHour = hour % 12 || 12;
    // Format minutes with leading zero if needed
    const formattedMinutes = minutes.padStart(2, '0');
    // Construct formatted time string
    return `${formattedHour}:${formattedMinutes} ${amOrPm}`;

      };

    return (
        <div className='listing-details' key={props.id}>
            <Link to={{
                pathname: `/listingpage`,
                state: props
            }}>
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