import React, { Component } from "react";


export default function Image(props) 
{
    return (
        <div className='image-container' key={props.id}>
            <img src = {props.image} alt="img" width="150px" height="150px"></img>
            </div>
    );
}