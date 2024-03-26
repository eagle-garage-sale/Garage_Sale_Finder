// ListingPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const ListingPage = () => {
  const location = useLocation();

  // Check if location.state is null
  if (!location.state) {
    return <div>No data available for this listing.</div>;
  }

  // Destructure the properties from location.state
  const { street_address, state, start_date, end_date, open_time, close_time, description, tag } = location.state;

  return (
    <div>
      <h3>
        {street_address}, {state}
      </h3>
      <p>
        {formatDate(start_date)} - {formatDate(end_date)}
      </p>
      <p>
        Hours: {formatTime(open_time)} - {formatTime(close_time)}
      </p>
      <p>
        {description}
      </p>
      <p>
        Tags: {tag}
      </p>
    </div>
  );
};

export default ListingPage;