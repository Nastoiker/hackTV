import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ value, max }) => {
  return (
    <div className="progress-bar-container mx-4">
      <progress className="progress-bar" value={value} max={max}></progress>
    </div>
  );
};

export default ProgressBar;
