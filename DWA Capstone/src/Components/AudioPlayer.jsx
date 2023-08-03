// AudioPlayer.js
import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ episode }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Implement audio player logic here based on the 'episode' prop
    // For example, load the audio file, handle play/pause, etc.
    // For simplicity, this example only toggles play/pause state
    const audioElement = new Audio(episode.file);

    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    return () => {
      audioElement.pause(); // Pause the audio when the component is unmounted
    };
  }, [episode, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div>
      {/* Implement your audio player UI here */}
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <p>Currently Playing: {episode.title}</p>
    </div>
  );
};

export default AudioPlayer;
