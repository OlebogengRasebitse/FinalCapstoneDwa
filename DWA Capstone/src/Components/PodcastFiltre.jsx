// PodcastFilter.js

import React from 'react';

const PodcastFilter = ({ onSortChange }) => {
  return (
    <div>
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" onChange={(e) => onSortChange(e.target.value)}>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
        <option value="dateAsc">Date Updated (Ascending)</option>
        <option value="dateDesc">Date Updated (Descending)</option>
      </select>
    </div>
  );
};

export default PodcastFilter;
