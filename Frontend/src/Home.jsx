import React from 'react';
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

  //Get our listings from backend and build a readable object array
  //whose contents will be passes as props in collection.map
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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
              <h3>1. Garage Sale Name</h3>
              <p>Category: Antiques</p>
              <p>Address: 123 Main St, City</p>
            </div>
          </li>
        </ul>
              {listings}
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

