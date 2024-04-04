import React, {useRef, useState, useEffect} from "react";
import * as Components from './AddListing_Components';
import { WithContext as ReactTags } from 'react-tag-input';
import { KEYWORDS } from './keywords';
import './tagstyle.css';
import profanity from 'leo-profanity';
import { Link } from "react-router-dom";
import GetListingsByIdJSON from './utils/GetListingsByID';
import buildObjectArray from './utils/BuildListingArray';
import { useNavigate } from "react-router-dom"

function getDate() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const date = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}`;
}

export function EditListingError() {
  return (
    <div>
      <h1>You Do not Have a Current Listing</h1>
      <Link to = "/form"> Add Listing</Link>
    </div>
  );
}


export function EditListing() {     
    const [title, setTitle] = useState('');                            
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

    const titleInputRef = useRef(null); // Create a reference to the title input element

    useEffect(() => {
        // Set focus on the title input field when the component mounts
        titleInputRef.current.focus();
    }, []);

    const navigate = useNavigate();

    //fetch data listing and update state variables
    useEffect(() => {
        //parses and builds array of user's listing info
        const unparsedUserData = GetListingsByIdJSON(document.cookie);
        const userData = JSON.parse(unparsedUserData);
        let collection = [];
        for (const jsonStr of userData)
        {
            collection.push(JSON.parse(jsonStr));
        }

        console.log("Tested Parsed Dataed: ", collection);

        console.log("Street address value: ", collection[0].street_address);

        //if there is userdata, populate the form.
        if (userData) {
            setTitle(collection[0].title);
            setStreetAddress(collection[0].street_address);
            setState(collection[0].state);
            setCity(collection[0].city);
            setZipcode(collection[0].zip_code);
            setStartDate(collection[0].start_date);
            setEndDate(collection[0].end_date);
            setOpenTime(collection[0].open_time);
            setCloseTime(collection[0].close_time);
            setDescription(collection[0].description);

            const tagsArray = collection[0].tag.split(',');
            const tagsObjectsArray = tagsArray.map(tag => ({ id: tag, text: tag }));
            setTags(tagsObjectsArray);
        }
    }, []);
    
    
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
        if (inputValues.title.trim() == '') {
            errors.title = 'Please enter a title';
        }
        else if (inputValues.title.length < 4) {
            errors.title = 'Has to be at least 4 characters'
        }
        else if (profanity.check(inputValues.title)) {
            errors.title = 'Contains profanity'
        }

        if (inputValues.streetAddress.trim() == '') {
            errors.streetAddress = 'Please enter a street address';
        }
        else if (profanity.check(inputValues.streetAddress)) {
            errors.streetAddress = 'Contains profanity'
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
        else if (profanity.check(inputValues.description)) {
            errors.description = 'Contains profanity'
        }
        else if (inputValues.description.length < 4) {
            errors.description = 'Has to be at least 4 characters'
        }
        if(tags.length === 0) {
            errors.tags = 'Please add at least one tag'
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
            title,
            streetAddress,
            state,
            city,
            zipcode,
            startDate,
            endDate,
            openTime,
            closeTime,
            description,
            tags
        });
        
        console.log(Object.keys(errors).length);

        if (Object.keys(errors).length == 0) {
        console.log("Button clicked");
        Delete();
        
        const tagsString = tags.map(tag => tag.text).join(',');

        const garageData = {
            title: title,
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
            token: document.cookie
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
            if(data.success == true) {
                console.log('Update successful');
                window.location.reload();
            } else {
                alert(data.msg);
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

    const Delete = () => {
        const token = {
            token: document.cookie
        }
        fetch ('http://127.0.0.1:5000/api/garagesales/register', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(token)
            
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Deletion Successful");
            }
            else {
                console.error(data.msg);
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    const DeleteButtonClick = () => {

        const token = {
            token: document.cookie
        }
        fetch ('http://127.0.0.1:5000/api/garagesales/register', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(token)
            
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Your garage sale has been deleted!");
            }
            else {
                console.error(data.msg);
            }
        })
        .catch(error => {
            console.error(error);
        })

        navigate('/home');
    };
    

    return (
        <div className="form-text">

            <Components.header>Edit Garage Sale Listing</Components.header>

            <Components.CenteredWrapper>

            <Components.ScrollableContent>

            <Components.Container>
                <Components.Form>
                    <Components.Title>Title</Components.Title>
                    <Components.TitleInput ref={titleInputRef} type='Title' placeholder='Title' value = {title} onChange={(e) => setTitle(e.target.value)}/>
                    {errors.title && <div style={{ color: 'red', marginTop: '1px' }}>{errors.title}</div>}
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
                    <Components.ZipCodeInput type='Zipcode' placeholder='Zipcode' value = {zipcode} onChange={(e) => setZipcode(e.target.value)}/>
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
                    {errors.tags && <div style={{color: 'red', marginTop: '1px' }}>{errors.tags}</div>}
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
                     <div style={{ position: 'absolute', left: '18%', top: '120%',transform: 'translate(-50%, -50%)' }}>
                        <Components.Button onClick={handleButtonClick}>
                            Edit Listing
                     </Components.Button>
                    </div>

                    <div style={{ position: 'absolute', left: '58%', top: '120%',transform: 'translate(-50%, -50%)', whiteSpace: 'nowrap'}}>
                        <Components.Button
                        onClick={DeleteButtonClick}
                        style={{
                            backgroundColor: "#F75E5B",
                            border: "1px solid #F75E5B"}}
                        >
                            Delete Listing
                        </Components.Button>
                    </div>
                </Components.Form>
            </Components.Container>
            
            </Components.ScrollableContent>
            
            </Components.CenteredWrapper>
        </div>
    )
}