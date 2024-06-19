import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ episode }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
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
