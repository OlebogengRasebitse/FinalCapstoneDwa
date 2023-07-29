import React, { useState } from 'react';

const ImagePreview = ({ imageUrl }) => {
  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => {
    setShowPreview((prevShowPreview) => !prevShowPreview);
  };

  return (
    <div className="image-preview-container">
      <img src={imageUrl} alt="Preview" onClick={togglePreview} />
      {showPreview && (
        <div className="image-preview-overlay" onClick={togglePreview}>
          <img src={imageUrl} alt="Full Preview" />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;

