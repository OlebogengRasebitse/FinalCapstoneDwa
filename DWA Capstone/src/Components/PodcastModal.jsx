// PodcastModal.js

import React from 'react';

const PodcastModal = ({ podcast, onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PodcastModal;
