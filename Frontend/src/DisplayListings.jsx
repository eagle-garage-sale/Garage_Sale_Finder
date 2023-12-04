import React, { Component, useState} from "react";
import * as Components from './Login_Components';


export default function GetListingJSON() {
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
        ListingJSON = data.sales;
        return ListingJSON;
      } else {
        console.error(data.msg);
      }
    })
    .catch(error => {
      console.error(error);
    });

};
