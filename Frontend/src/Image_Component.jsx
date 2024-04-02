import React, { Component } from "react";


export default function Image(props) 
{
    return (
        <div className='image-container' key={props.id}>
            <img src = {props.image} alt="img" style="width: 150px;"></img>
            </div>
    );
}