import React, {Component, useState} from "react";
import * as Components from './AddListing_Components';


function AddListing() {
    const [streetAddress, setStreetAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const [description, setDescription] = useState('');

    const handleButtonClick = () => {
        console.log("Button clicked");

        const garageData = {
            street_address: streetAddress,
            state: state,
            city: city,
            zip_code: zipcode,
            user_id: 1,
            start_date: startDate,
            end_date: endDate,
            open_time: openTime,
            close_time: closeTime,
            description: description,
        }
        fetch('http://127.0.0.1:5000/api/garagesales/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(garageData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                console.log('Registration successful');
            } else {
                console.error(data.msg);
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="form-text">

            <Components.header>Add Garage Sale Listing</Components.header>

            <Components.CenteredWrapper>

            <Components.Container>
                <Components.Form>
                    <Components.Title>Address</Components.Title>
                    <Components.Input type='Street Address' placeholder='Street Address' value = {streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>
                    <Components.Input type='State (EX: OR, TX, FL)' placeholder='State' value = {state} onChange={(e) => setState(e.target.value)}/>
                    <Components.Input type='City' placeholder='City' value = {city} onChange={(e) => setCity(e.target.value)}/>
                    <Components.Input type='Zipcode' placeholder='Zipcode' value = {zipcode} onChange={(e) => setZipcode(e.target.value)}/>
                    
                </Components.Form>
            </Components.Container>

            </Components.CenteredWrapper>

            <Components.ContainerWrapper>

                <Components.TinyContainer>
                    <Components.Form>
                        <Components.Title>Start Date</Components.Title>
                        <Components.Input type='start_date' placeholder='MM/DD/YYYY' value = {startDate} onChange={(e) => setStartDate(e.target.value)}/>
                    </Components.Form>
                </Components.TinyContainer>

                <Components.TinyContainer>
                    <Components.Form>
                        <Components.Title>End Date</Components.Title>
                        <Components.Input type='end_date' placeholder='MM/DD/YYYY' value = {endDate} onChange={(e) => setEndDate(e.target.value)}/>
                    </Components.Form>
                </Components.TinyContainer>

            </Components.ContainerWrapper>

            <Components.ContainerWrapper>

            <Components.TinyContainer>
                <Components.Form>
                    <Components.Title>Opening Time</Components.Title>
                    <Components.Input type='open_time' placeholder='XX:XX AM/PM' value = {openTime} onChange={(e) => setOpenTime(e.target.value)}/>
                </Components.Form>
            </Components.TinyContainer>

            <Components.TinyContainer>
                <Components.Form>
                    <Components.Title>Closing Time</Components.Title>
                    <Components.Input type='close_time' placeholder='XX:XX AM/PM' value = {closeTime} onChange={(e) => setCloseTime(e.target.value)}/>
                </Components.Form>
            </Components.TinyContainer>

            </Components.ContainerWrapper>

            <Components.CenteredWrapper>

            <Components.Container>
                <Components.Form>
                    <Components.Title>Description</Components.Title>
                    <Components.DescriptionInput type='description' placeholder='500 Characters Max' value = {description} onChange={(e) => setDescription(e.target.value)}/>
                </Components.Form>
            </Components.Container>

            </Components.CenteredWrapper>

            <Components.Button onClick={handleButtonClick}>
            Add Listing
            </Components.Button>
             
    

        </div>
    )
}

export default AddListing;