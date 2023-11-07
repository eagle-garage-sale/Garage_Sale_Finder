import React from 'react';
import ReactDOM from 'react-dom';
import Login_Main from './Login_Main';
import Maps from './Maps';
import MapsButton from './MapsButton';
import Home from './Home';
import HomeButton from './HomeButton'
import "./Login_styles.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = document.getElementById('root');

//delete this later. It is used to render button on top of login component

const WrapperComponent = () => (
  <div>
    <MapsButton/>
    <HomeButton/>
    <Login_Main/>
  </div>
);


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WrapperComponent />} />
      <Route path="/maps" element={<Maps/>} />
      <Route path="/home" element={<Home/>}  />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);