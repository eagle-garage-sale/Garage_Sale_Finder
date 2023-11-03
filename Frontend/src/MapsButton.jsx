import React from 'react';
import { Link } from 'react-router-dom';

export default function MapsButton() {
    const buttonStyle = {
        position: 'absolute',
        left: '100px',
        top: '10px',
        zIndex: 1,
    };

    return (
        <Link to ="/maps">
            <button>
                Go To Maps
            </button>
        </Link>
    );
}