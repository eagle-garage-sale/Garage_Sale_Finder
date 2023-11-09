import React from 'react';
import LoginButton from './LoginButton';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <LoginButton/>
            <h1>Garage Sale Finder</h1>
        </nav>
    );
};