import React, {Component, useState} from "react";
import * as Components from './AddListing_Components';
import { WithContext as ReactTags } from 'react-tag-input';

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
    const [tags, setTags] = useState([]);

    const states = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
                     'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
                     'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
                     'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
                     'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    const suggestions = ['tag1', 'tag2', 'tag3', 'tag4'];

    const handleTagDelete = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    };
    
    const handleTagAddition = (tag) => {
        const newTags = [...tags, tag];
        setTags(newTags);
      };
    
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
                    <Components.AddressInput type='Street Address' placeholder='Street Address' value = {streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>
                    <Components.Select type='State' placeholder='State' value = {state} onChange={(e) => setState(e.target.value)}>
                        <option value ='' disabled>State</option>
                        {states.map((stateOption, index) => (
                             <option key={index} value={stateOption}>{stateOption}</option>
                             ))}
                    </Components.Select>        
                    <Components.CityInput type='City' placeholder='City' value = {city} onChange={(e) => setCity(e.target.value)}/>
                    <Components.ZipCodeInput type='Zipcode' placeholder='Zipcode' value = {zipcode} onChange={(e) => setZipcode(e.target.value)}/>

                    <Components.DoubleContainer>
                        <div>
                            <Components.Title>Start Date</Components.Title>
                            <Components.DateInput type='date' value = {startDate} onChange={(e) => setStartDate(e.target.value)}/>
                        </div>
                        <div>
                            <Components.Title>End Date</Components.Title>
                            <Components.DateInput type='date' value = {endDate} onChange={(e) => setEndDate(e.target.value)}/>
                        </div>
                    </Components.DoubleContainer>

                    <Components.DoubleContainer>
                        <div>
                            <Components.Title>Opening Time</Components.Title>
                            <Components.TimeInput type='time' value = {openTime} onChange={(e) => setOpenTime(e.target.value)}/>
                        </div>
                        <div>
                            <Components.Title>Closing Time</Components.Title>
                            <Components.TimeInput type='time' value = {closeTime} onChange={(e) => setCloseTime(e.target.value)}/>
                        </div>
                    </Components.DoubleContainer>
                    <Components.Title>Description</Components.Title>
                    <Components.DescriptionInput type='description' placeholder='500 Characters Max' value = {description} onChange={(e) => setDescription(e.target.value)}/>
                    <Components.Title>Keywords</Components.Title>
                    <ReactTags
                       tags={tags}
                       suggestions={suggestions}
                       handleDelete={handleTagDelete}
                       handleAddition={handleTagAddition}
                       renderTag={({ tag, onDelete, index }) => (
                           <Components.Tag key={index} onClick={() => onDelete(index)}>
                             {tag.text}
                           </Components.Tag>
                         )}
                        />
                    <Components.Button onClick={handleButtonClick}>
                    Add Listing
                    </Components.Button>
                </Components.Form>
            </Components.Container>
            
            
            </Components.CenteredWrapper>
        </div>
    )
}

export default AddListing;