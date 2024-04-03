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
import SearchListing from './SearchListing';



export default function Home() {
  

  GetListingJSON();
  const collection = buildObjectArray();

  const [selectedTags, setSelectedTags] = useState([]);

  const filteredListings = collection.filter(item => {
    if (selectedTags.length === 0)
    {
      return true; //if no tags are entered, show all listings
    }
    //return item.tag.some(tag => selectedTags.includes(tag)) //filters listing based on tags
    return selectedTags.includes(item.tag);
  });

  const listings = filteredListings.map(item=> (
    <ShowListing
     key = {item.id}
     {...item}/>
  ));

  const handleTagSelection = tags => {
    console.log('Selected tags:', tags);
    setSelectedTags(tags.map(tag => tag.text))
  };
  
  return (
    
    <div className="home-text">
      
      <Navbar/>
      <Components.Container>
        <div className="flex-container">
          <Components.keywordContainer>
          <SearchListing onTagSelection={handleTagSelection} />
          </Components.keywordContainer>
        <ul className='listing'>
          <li className='listing-item'>
            <div className='listing-details'>
            {listings}
            </div>
          </li>
        </ul>
        </div>
      </Components.Container>
      <Components.Map>
        <Maps />
      </Components.Map>
    </div>
  );
}

