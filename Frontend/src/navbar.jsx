import React from 'react';
import LoginButton from './LoginButton';
import AddListingButton from './AddListingButton';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className='navbar'>
            <LoginButton/>
            <AddListingButton/>
            <h1>Garage Sale Finder</h1>
        </nav>
    );
};