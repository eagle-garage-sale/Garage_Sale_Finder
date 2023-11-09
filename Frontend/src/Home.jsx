import React from 'react';
import './Home_Styles.css';
import Maps from './Maps';
import Navbar from './navbar'
import * as Components from './Home_Components';

export default function Home() {
  return (
    <div className="home-text">
      <Navbar/>
      <div className="left-column">
        <h2>Location Results</h2>
      </div>  
      <Maps />
    </div>
  );
}

