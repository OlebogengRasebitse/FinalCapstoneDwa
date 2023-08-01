import React from 'react';

const DateFilter = ({ onSortChange }) => {
  return (
    <div>
      <label htmlFor="sortDate">Sort By Date:</label>
      <select id="sortDate" onChange={(e) => onSortChange(e.target.value)}>
        <option value="dateAsc">Date Updated (Ascending)</option>
        <option value="dateDesc">Date Updated (Descending)</option>
      </select>
    </div>
  );
};

export default DateFilter;
