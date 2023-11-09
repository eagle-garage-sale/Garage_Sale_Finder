import React from 'react';
import { Link } from 'react-router-dom';
import './AddListingButton_Styles.css'

export default function AddListingButton() {
    return (
        <Link to ="/form">
            <button className = "listingbutton">
                Add Listing
            </button>
        </Link>
    )
}