import React from 'react';
import LoginButton from './LoginButton';
import AddListingButton from './AddListingButton';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className='navbar'>
            <div className='title'>
                <h1>Garage Sale Finder</h1>
            </div>
            <LoginButton/>
            <AddListingButton/>
        </nav>
    );
};