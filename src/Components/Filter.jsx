// PodcastFilter.js

import React from 'react';

const Filter = ({ onTitleSortChange, onDateSortChange, onGenreChange, onSearchQueryChange }) => {
  const genreMap = {
    1: 'Comedy',
    2: 'News',
    // Add more genre IDs and their names here as needed
  };

  return (
    <div className="filters">
      <div>
        <label htmlFor="titleSort">Sort By Title:</label>
        <select id="titleSort" onChange={(e) => onTitleSortChange(e.target.value)}>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
      <div>
        <label htmlFor="dateSort">Sort By Date:</label>
        <select id="dateSort" onChange={(e) => onDateSortChange(e.target.value)}>
          <option value="dateAsc">Date Updated (Ascending)</option>
          <option value="dateDesc">Date Updated (Descending)</option>
        </select>
      </div>
      <div>
        <label htmlFor="genre">Filter By Genre:</label>
        <select id="genre" onChange={(e) => onGenreChange(e.target.value)}>
          <option value="All">All</option>
          <option value="1">Comedy</option>
          <option value="2">News</option>
          {/* Add more genre IDs and their names here as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="search">Search Title:</label>
        <input type="text" id="search" onChange={(e) => onSearchQueryChange(e.target.value)} />
      </div>
    </div>
  );
};

export default Filter;
