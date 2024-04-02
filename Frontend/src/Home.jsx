import React, { useEffect, useState } from 'react';
import './Home_Styles.css';
import Maps from './Maps';
import Navbar from './Navbar'
import LoginButton from './LogoffButton';
import AddListingButton from './AddListingButton';
import * as Components from './Home_Components';
import listing from './Listing_Component';
import GetListingJSON from './utils/GetListings';
import buildObjectArray from './utils/BuildListingArray';
import ShowListing from './Listing_Component';




export default function Home() {
  

  GetListingJSON();
  const collection = buildObjectArray();

  const listings = collection.map(function(item) {
    return (
      <ShowListing
       key = {item.id}
       {...item}/>
    )
  })

  
  return (
    
    <div className="home-text">
      
      <Navbar/>
      <div className="left-column">

        <ul className='listing'>
          <li className='listing-item'>
            <div className='listing-details'>
            {listings}
            </div>
          </li>
        </ul>
      </div>  
      <div className='right-column'>
        <Maps />
      <Components.header>Garage Sale Finder</Components.header>
      <div className="left-column" />
      
      <Maps />
      </div>
    </div>
  );
}

