import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeButton() {
    const buttonStyle = {
        position: 'absolute',
        left: '600px',
        top: '10px',
        zIndex: 1,
    };

    return (
        <Link to ="/home">
            <button>
                Go Home
            </button>
        </Link>
    );
}