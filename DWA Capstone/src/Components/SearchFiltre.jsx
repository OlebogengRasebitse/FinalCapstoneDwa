import React from 'react';

const SearchFilter = ({ onSearchQueryChange }) => {
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    onSearchQueryChange(query);
  };

  return (
    <div>
      <label htmlFor="search">Search by Title:</label>
      <input type="text" id="search" onChange={handleSearchInputChange} />
    </div>
  );
};

export default SearchFilter;
