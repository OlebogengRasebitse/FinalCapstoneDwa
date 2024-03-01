import React, { useState, useEffect } from 'react';
// import { Button } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import AudioPlayer from './AudioPlayer';

const PodcastModal = ({ podcast, onClose, isAudioPlaying, children }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => {
    if (isAudioPlaying) {
      setShowConfirmation(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  useEffect(() => {
    // Event listener for beforeunload
    const handleBeforeUnload = (event) => {
      if (isAudioPlaying) {
        event.preventDefault();
        event.returnValue = ''; // Needed for Chrome
        // Show the alert to inform the user that audio is playing
        setShowConfirmation(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAudioPlaying]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <Button
          onClick={handleClose}
          style={{ position: 'absolute', top: '10px', left: '10px' }}
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
        {showConfirmation && (
          <div>
            <p>You have audio playing. Are you sure you want to close the page?</p>
            <Button onClick={handleConfirmClose}>Confirm Close</Button>
          </div>
        )}
        <AudioPlayer episode={podcast} isPlaying={isAudioPlaying} />
      </div>
    </div>
  );
};

export default PodcastModal;

