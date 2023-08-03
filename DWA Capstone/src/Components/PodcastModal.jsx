import React from 'react';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PodcastModal = ({ podcast, onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <Button
          onClick={onClose}
          style={{ position: 'absolute', top: '10px', left: '10px' }}
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default PodcastModal;
