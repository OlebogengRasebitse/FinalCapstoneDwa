import React from 'react';

const TitleFilter = ({ onSortChange }) => {
  return (
    <div>
      <label htmlFor="sortTitle">Sort By Title:</label>
      <select id="sortTitle" onChange={(e) => onSortChange(e.target.value)}>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
  );
};

export default TitleFilter;
