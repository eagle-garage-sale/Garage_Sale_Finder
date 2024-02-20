import React from 'react';
import ReactDOM from 'react-dom';
import Login_Main from './Login_Main';
import Maps from './Maps';
import Home from './Home';
import LoginButton from './LogoffButton'
import "./Login_styles.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddListing from './AddListing';

const root = document.getElementById('root');

//delete this later. It is used to render button on top of login component

/*const WrapperComponent = () => (
  <div>
    <LoginButton/>
  </div>
);
*/

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login_Main />} />
      <Route path="/form" element={<AddListing/>}/>
      <Route path="/home" element={<Home/>}  />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);