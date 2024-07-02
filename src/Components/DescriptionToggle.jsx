import React, { useState } from 'react';

const DescriptionToggle = ({ description }) => {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleDescription = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <span className="description" onClick={toggleDescription}>
      {isMinimized ? (
        <>
          {description.substr(0, 200)}
          <button>Read More</button>
        </>
      ) : (
        <>
          {description}
          <button>Read Less</button>
        </>
      )}
    </span>
  );
};

export default DescriptionToggle;
