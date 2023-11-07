import React from 'react';
import styles from './Home';

export default function Home() {
  return (
    <div>
      <div className="box-container">
        <Box color="#3498db" title="Garage Sale Finder" content="Welcome!" />
      </div>
    </div>
  );
}

const Box = ({ color, title, content }) => {
  return (
    <div className="box" style={{ backgroundColor: color }}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};