import React from 'react';
import './Home_Styles.css';
import Maps from './Maps';
import Navbar from './Navbar'
import LoginButton from './LoginButton';
import AddListingButton from './AddListingButton';
import * as Components from './Home_Components';

export default function Home() {
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
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
                <h3>2. Garage Sale Name</h3>
                <p>Category: Sports Equipment, Christmas Decorations</p>
                <p>Address: 127 Main St, City</p>
            </div>
          </li>
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
                <h3>3. Garage Sale Name</h3>
                <p>Category: Karaoke Machiens, Stuffed Animals</p>
                <p>Address: 124 Main St, City</p>
            </div>
          </li>
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
              <h3>1. Garage Sale Name</h3>
              <p>Category: Antiques</p>
              <p>Address: 123 Main St, City</p>
            </div>
          </li>
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
                <h3>2. Garage Sale Name</h3>
                <p>Category: Sports Equipment, Christmas Decorations</p>
                <p>Address: 127 Main St, City</p>
            </div>
          </li>
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
                <h3>3. Garage Sale Name</h3>
                <p>Category: Karaoke Machiens, Stuffed Animals</p>
                <p>Address: 124 Main St, City</p>
            </div>
          </li>
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
              <h3>1. Garage Sale Name</h3>
              <p>Category: Antiques</p>
              <p>Address: 123 Main St, City</p>
            </div>
          </li>
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
                <h3>2. Garage Sale Name</h3>
                <p>Category: Sports Equipment, Christmas Decorations</p>
                <p>Address: 127 Main St, City</p>
            </div>
          </li>
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
                <h3>3. Garage Sale Name</h3>
                <p>Category: Karaoke Machiens, Stuffed Animals</p>
                <p>Address: 124 Main St, City</p>
            </div>
          </li>
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
              <h3>1. Garage Sale Name</h3>
              <p>Category: Antiques</p>
              <p>Address: 123 Main St, City</p>
            </div>
          </li>
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
                <h3>2. Garage Sale Name</h3>
                <p>Category: Sports Equipment, Christmas Decorations</p>
                <p>Address: 127 Main St, City</p>
            </div>
          </li>
          <li className='listing-item'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJWX3CaS8jyYQkZmROfA-iwgDza17vjT4vlBJP6WshmCJ_kRx2793s4epRhkAmPwGkbtw&usqp=CAU" alt="Restaurant" />
            <div className='listing-details'>
                <h3>3. Garage Sale Name</h3>
                <p>Category: Karaoke Machiens, Stuffed Animals</p>
                <p>Address: 124 Main St, City</p>
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

