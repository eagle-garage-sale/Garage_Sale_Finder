import React from 'react';
import { Link } from 'react-router-dom';
import './LoginButton_Styles.css';

export default function LoginButton() {
    return (
        <Link to ="/login">
            <button className = "loginbutton">
                Login Here
            </button>
        </Link>
    );
}