import React, { Component, useState} from "react";
import * as Components from './Login_Components';

export default function ShowListing(props)
{
    return (
        <div className='listing-details' key={props.id}>
            <h3>
                 {props.description}
            </h3>
            <p>
                Address: {props.street_address}, {props.state}
            </p>
            <p>
                Date: {props.start_date} -{props.end_date}
            </p>
            <p>
                Open From: {props.open_time} - {props.close_time}
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