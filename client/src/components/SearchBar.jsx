import React from 'react';

const Search = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className='form-control search'
      placeholder='Search by Date'
      value={value}
      onChange={onChange}
      id='searchInput'
    />
  );
};

export default Search;
