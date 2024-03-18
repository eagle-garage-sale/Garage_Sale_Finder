import React from 'react';
import { Link } from 'react-router-dom';
import './LogoffButton_Styles.css';



export default function LogoffButton() {
    const deleteCookie =() => {
        document.cookie = "";
        sessionStorage.removeItem("username");
    }

    return (
        <Link to ="/">
            <button className = "loginbutton" onClick={deleteCookie}>
                Logoff
            </button>
        </Link>
    );
}