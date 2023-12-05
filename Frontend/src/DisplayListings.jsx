import React, { Component, useState} from "react";
import * as Components from './Login_Components';


function GetListingJSON() {
    fetch('http://127.0.0.1:5000/api/home/sales', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log(data.sales);
        let ListingJSON = data.sales;
        return ListingJSON;
      } else {
        console.error(data.msg);
      }
    })
    .catch(error => {
      console.error(error);
    });

};

export default function ShowListing(props)
{
    const displayListings = listings.map((props) => (
        <div className='listing-details' key={props.id}>
            <h3>
                {props.id} {props.description}
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
    ));

    return <div>{displayListings}</div>;
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