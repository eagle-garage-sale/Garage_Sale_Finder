import React from 'react';
import LogoffButton from './LogoffButton';
import AddListingButton from './AddListingButton';
import EditListingButton from './EditListingButton';
import './Navbar.css';
import logo from './assets/images/logo.png'

export default function Navbar() {
    return (
        <nav className='navbar'>
            <div className='logo'>
                <img src={logo} alt="Logo" />
            </div>
            <div className='title'>
                <h1>Garage Sale Finder</h1>
            </div>
            <LogoffButton />
            <AddListingButton/>
            <EditListingButton/>
        </nav>
    );
};