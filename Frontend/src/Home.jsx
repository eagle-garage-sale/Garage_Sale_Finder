import React from 'react';
import './Home_Styles.css';
import Maps from './Maps';
import LoginButton from './LoginButton';
import AddListingButton from './AddListingButton';
import * as Components from './Home_Components';

export default function Home() {
  return (
    <div className="home-text">
      <LoginButton/>
      <AddListingButton/>
      <Components.header>Garage Sale Finder</Components.header>
      <div className="left-column" />
      <Maps />
      </div>
  );
}

