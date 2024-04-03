import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { KEYWORDS } from './keywords';
import './tagstyle.css';
import * as Components from './AddListing_Components';
import { WithContext as ReactTags } from 'react-tag-input';
import profanity from 'leo-profanity';
import axios from "axios";
import * as FormData from "form-data";
import { Link } from 'react-router-dom';
import './AddListingButton_Styles.css'

function SearchListing({ onTagSelection }){

    const [tags, setTags] = useState([]);
    const [showSearch, setShowSearch] = useState(false); // Define showSearch state
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
    

    const handleSearchClick = () => {
        onTagSelection(tags);
    };

    return (
        <div className="search-container">
                <div className="search-box">
                    <ReactTags
                        inputFieldPosition="top"
                        tags={tags}
                        suggestions={suggestions}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        handleTagClick={handleTagClick}
                        autocomplete
                        placeholder="Filter Listings by Keywords"
                    />
                </div>
                <button className="search-button" onClick={handleSearchClick}>Search</button>
        </div>
    );
}
export default SearchListing;