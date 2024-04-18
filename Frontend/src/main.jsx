import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Login_Main from './Login_Main';
import Maps from './Maps';
import Home from './Home';
import LoginButton from './LogoffButton'
import "./Login_styles.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddListing from './AddListing';
import { EditListing, EditListingError } from './EditListing';
import ListingPage from './ListingPage';

const container = document.getElementById('root');
const root = createRoot(container);
const hasCurrentListing = true;           //temp. Will use to determine if user has a listing to edit.

//delete this later. It is used to render button on top of login component

/*const WrapperComponent = () => (
  <div>
    <LoginButton/>
  </div>
);
*/

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login_Main />} />
      <Route path="/form" element={<AddListing/>}/>

      <Route path="/home" element={<Home/>}  />
      <Route path="/login" element={<Login_Main/>}  />
      <Route path ="/editlisting" element = { hasCurrentListing ? ( <EditListing /> ) : ( <EditListingError />) } />
      <Route path="/listingpage/:id" element={<ListingPage/>} />

    </Routes>
  </BrowserRouter>,
);