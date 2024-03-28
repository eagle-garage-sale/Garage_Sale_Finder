import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { KEYWORDS } from './keywords';
import './tagstyle.css';
import * as Components from './AddListing_Components';
import { WithContext as ReactTags } from 'react-tag-input';
import profanity from 'leo-profanity';
import axios from "axios";
import * as FormData from "form-data";


function getDate() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const date = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}`;
}

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
    const [errors, setErrors] = useState({});

    //File states
    const [files, setFiles] = useState(null);
    const [ progress, setProgress ] = useState({ started: false, pc: 0 });
    const [ msg, setMsg ] = useState(null);


    const navigate = useNavigate();


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

    const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.streetAddress.trim() == '') {
            errors.streetAddress = 'Please enter a street address';
        }
        if (inputValues.state.trim() == '') {
            errors.state = 'Please select a state';
        }
        if (inputValues.city.trim() == '') {
            errors.city = 'Please enter a city'
        }
        if (inputValues.zipcode.trim() == '') {
            errors.zipcode = 'Please enter a zipcode'
        }
        else {
            if (inputValues.zipcode.length < 5 || /^\d+$/.test(inputValues.zipcode) == false) {
                errors.zipcode = 'Zipcode is invalid'
            }
        }
        if (inputValues.startDate.trim() == '') {
            errors.startDate = 'Please enter a date'
        }
        else {
            if (inputValues.startDate < getDate()) {
                errors.startDate = 'Date is invalid'
            }
        }
        if (inputValues.endDate.trim() == '') {
            errors.endDate = 'Please enter a date'
        }
        else {
            if (inputValues.endDate < inputValues.startDate) {
                errors.endDate = 'Date is invalid'
            }
        }
        if(inputValues.openTime.trim() == '') {
            errors.openTime = 'Please enter a time'
        }
        if(inputValues.closeTime.trim() == '') {
            errors.closeTime = 'Please enter a time'
        }
        if(inputValues.description.trim() == '') {
            errors.description = 'Please enter a description'
        }
        else {
            if (profanity.check(inputValues.description)) {
                errors.description = 'Contains profanity'
            }
        }

        return errors;
    }



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


    const handleButtonClick = (event) => {
        event.preventDefault();
        
        const errors = validateValues({
            streetAddress,
            state,
            city,
            zipcode,
            startDate,
            endDate,
            openTime,
            closeTime,
            description
        });

        if (Object.keys(errors).length == 0) {
            console.log("Button clicked");

            const tagsString = tags.map(tag => tag.text).join(',');

            const garageData = {
                street_address: streetAddress,
                state: state,
                city: city,
                zip_code: zipcode,
                start_date: startDate,
                end_date: endDate,
                open_time: openTime,
                close_time: closeTime,
                description: description,
                tag: tagsString,
                token: document.cookie,
            }

            if (!files) {
                setMsg("No file selected");
                return;
            }
    
            const fd = new FormData();
            for (let i = 0; i<files.length; i++) {
                fd.append("file", files[i]);
            }
    
            fd.append("username", sessionStorage.getItem("username"));
    
            setMsg("Uploading...");
            setProgress(prevState => {
                return {...prevState, started: true}
            })
            axios.post('http://127.0.0.1:5000/garagesales/addImage', fd, {
    
                onUploadProgress: (progressEvent) => { setProgress(prevState => {
                    return {...prevState, pc: progressEvent.progress*100}
                })},
                headers: {
    
                }          
            })
            .then(res => {
                setMsg("Upload successful");
                console.log(res.data)
            })
            .catch(err => {
                setMsg("Upload failed");
                console.error(err)
            });
    
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
            navigate('/home');

        }

        setErrors(errors);
    };


    return (
        <div className="form-text">
            <Components.header>Add Garage Sale Listing</Components.header>

            <Components.CenteredWrapper>
        
            <Components.ScrollableContent>

            <Components.Container>
                <Components.Form>

                    <Components.Title>Address</Components.Title>
                    <Components.AddressInput type='Street Address' placeholder='Street Address' value = {streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>
                    {errors.streetAddress && <div style={{ color: 'red', marginTop: '1px' }}>{errors.streetAddress}</div>}
                    <Components.Select type='State' placeholder='State' value = {state} onChange={(e) => setState(e.target.value)}>
                        <option value ='' disabled>State</option>
                        {states.map((stateOption, index) => (
                             <option key={index} value={stateOption}>{stateOption}</option>
                             ))}
                    </Components.Select>
                    {errors.state && <div style={{ color: 'red', marginTop: '1px' }}>{errors.state}</div>}        
                    <Components.CityInput type='City' placeholder='City' value = {city} onChange={(e) => setCity(e.target.value)}/>
                    {errors.city && <div style={{ color: 'red', marginTop: '1px' }}>{errors.city}</div>}
                    <Components.ZipCodeInput type='Zipcode' placeholder='Zipcode' maxLength={5} value = {zipcode} onChange={(e) => setZipcode(e.target.value)}/>
                    {errors.zipcode && <div style={{ color: 'red', marginTop: '1px' }}>{errors.zipcode}</div>}
                    <Components.DoubleContainer>
                        <div>
                            <Components.Title>Start Date</Components.Title>
                            <Components.DateInput type='date' value = {startDate} onChange={(e) => setStartDate(e.target.value)}/>
                            {errors.startDate && <div style={{ color: 'red', marginTop: '1px' }}>{errors.startDate}</div>}
                        </div>
                        <div>
                            <Components.Title>End Date</Components.Title>
                            <Components.DateInput type='date' value = {endDate} onChange={(e) => setEndDate(e.target.value)}/>
                            {errors.endDate && <div style={{ color: 'red', marginTop: '1px' }}>{errors.endDate}</div>}
                        </div>
                    </Components.DoubleContainer>

                    <Components.DoubleContainer>
                        <div>
                            <Components.Title>Opening Time</Components.Title>
                            <Components.TimeInput type='time' value = {openTime} onChange={(e) => setOpenTime(e.target.value)}/>
                            {errors.openTime && <div style={{ color: 'red', marginTop: '1px' }}>{errors.openTime}</div>}
                        </div>
                        <div>
                            <Components.Title>Closing Time</Components.Title>
                            <Components.TimeInput type='time' value = {closeTime} onChange={(e) => setCloseTime(e.target.value)}/>
                            {errors.closeTime && <div style={{ color: 'red', marginTop: '1px' }}>{errors.closeTime}</div>}
                        </div>
                    </Components.DoubleContainer>
                    <Components.Title>Description</Components.Title>
                    <Components.DescriptionInput type='description' placeholder='500 Characters Max' value = {description} onChange={(e) => setDescription(e.target.value)}/>
                    {errors.description && <div style={{ color: 'red', marginTop: '1px' }}>{errors.description}</div>}
                    <Components.Title>Keywords</Components.Title>
                    <ReactTags
                       tags={tags}
                       suggestions={suggestions}
                       delimiters={delimiters}
                       handleDelete={handleDelete}
                       handleAddition={handleAddition}
                       handleDrag={handleDrag}
                       handleTagClick={handleTagClick}
                       inputFieldPosition="bottom"
                       autocomplete
                        />

                    <input onChange={ (e) => { setFiles(e.target.files) }} type="file" multiple/>
                    <Components.Button
                    onClick = {handleButtonClick}>
                    Add Listing
                    </Components.Button>
                    { progress.started && <progress max="100" value={progress.pc}></progress>}
                    { msg && <span>{msg}</span>}
                    
                </Components.Form>
            </Components.Container>
            
            </Components.ScrollableContent>
            
            </Components.CenteredWrapper>
        </div>
    );
}

export default AddListing;