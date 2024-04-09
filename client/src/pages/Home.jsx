import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const HomePage = () => {
  return (
    <div className='background d-flex justify-content-center align-items-center'>
      <div className='d-flex flex-column align-items-center'>
        <div className='justify-content-between'>
          <Link to="/fryer" className="btn btn-primary btn-custom m-3 d-flex align-items-center justify-content-center">
            <h1>Fryer</h1>
          </Link>
          <Link to="/grill" className="btn btn-secondary btn-custom m-3 d-flex align-items-center justify-content-center">
            <h1>Grill</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
