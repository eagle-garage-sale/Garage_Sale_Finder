import React from 'react';
import LoginButton from './LoginButton';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className='navbar'>
            <div className='title'>
                <h1>Garage Sale Finder</h1>
            </div>
            <div className='login-container'>
                <LoginButton className="login-button"/>
            </div>
        </nav>
    );
};