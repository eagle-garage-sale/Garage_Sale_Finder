import React from 'react';
import ReactDOM from 'react-dom';
import Login_Main from './Login_Main';
import Maps from './Maps';
import Home from './Home';
import LoginButton from './LoginButton'
import "./Login_styles.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddListing from './AddListing';
import EditListing from './EditListing.jsx';

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
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<AddListing/>} />
      <Route path="/login" element={<Login_Main/>}  />
      <Route path="/editlisting" element={<EditListing/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);