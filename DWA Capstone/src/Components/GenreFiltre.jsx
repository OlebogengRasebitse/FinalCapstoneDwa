// GenreFilter.js
import React from 'react';

const GenreFilter = ({ onGenreChange }) => {
  const genreMap = {
    1: 'Comedy',
    2: 'News',
    // Add more genre IDs and their names here as needed
  };

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    onGenreChange(genreId);
  };

  return (
    <div>
      <label htmlFor="genre">Genre:</label>
      <select id="genre" onChange={handleGenreChange}>
        <option value="All">All</option>
        <option value="1">	Personal Growth</option>
        <option value="2">True Crime and Investigative Journalism</option>
        <option value="3">	History</option>
        <option value="4">Comedy</option>
        <option value="5">Entertainment</option>
        <option value="6">Business</option>
        <option value="7">Fiction</option>
        <option value="8">News</option>
        <option value="9">Kids and Family</option>

        {/* Add more genre options as needed */}
      </select>
    </div>
  );
};

export default GenreFilter;
