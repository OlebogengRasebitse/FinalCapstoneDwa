import React from 'react';

const FormattedDate = ({ date }) => {
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return <span>{formatDate(date)}</span>;
};

export default FormattedDate;
