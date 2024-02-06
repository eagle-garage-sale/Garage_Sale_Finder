import React, {Component, useState} from "react";
import { render } from 'react-dom';
import { KEYWORDS } from './keywords';
import './tagstyle.css';
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
    const [errorMessage, setErrorMessage] = useState('');

    const states = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
                     'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
                     'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
                     'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
                     'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    const suggestions = KEYWORDS.map((keywords) => {
        return {
            id: keywords,
            text: keywords,
        };
    });

    const KeyCodes = {
        comma: 188,
        enter: 13,
      };
      
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        if (suggestions.some(suggestedTag => suggestedTag.text === tag.text)) {
            // Add the tag only if it's in the suggestions
            setTags([...tags, tag]);
          }
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };
    
    const handleButtonClick = (e) => {
        e.preventDefault();
        if (streetAddress.trim() === '' || city.trim() === '' || state.trim() === '' || zipcode.trim() === '') {
            setErrorMessage('Please enter a valid address.');
            return; // Stop further execution if there's an error
        }

        // Clear any previous error message
        setErrorMessage('');        
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
                window.location.reload();
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
                    {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
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
                       delimiters={delimiters}
                       handleDelete={handleDelete}
                       handleAddition={handleAddition}
                       handleDrag={handleDrag}
                       handleTagClick={handleTagClick}
                       inputFieldPosition="top"
                       autocomplete
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