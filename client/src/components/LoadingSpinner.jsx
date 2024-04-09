import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className='background d-flex justify-content-center pt-5'>
      <div className='spinner'></div>
    </div>
  );
};

export default LoadingSpinner;
