import React from 'react';
import { Link } from 'react-router-dom';
import './EditListingButton_Styles.css';

export default function EditListingButton() {
    return (
        <Link to ="/editlisting">
            <button className = "listingbutton">
                Edit Listing
            </button>
        </Link>
    );
}