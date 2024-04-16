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

                <a href="/home">
                <img src={logo} alt="Logo" />
                </a>
            </div>
            <div className='title'>
                <a href="/home">
                <h1>Garage Sale Finder</h1>
                </a>
            </div>
            <LogoffButton />
            <AddListingButton/>
            <EditListingButton/>
        </nav>
    );
};