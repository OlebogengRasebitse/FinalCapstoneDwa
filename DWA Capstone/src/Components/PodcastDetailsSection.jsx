import React, { useState, useEffect } from 'react';
import FavoriteButton from './FavoriteButton';

const PodcastDetailsSection = ({ selectedPodcast }) => {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Function to handle season selection
  const handleSeasonSelect = (seasonIndex, seasonNumber) => {
    setSelectedSeasonIndex(seasonIndex);
  };

  // useEffect hook to attach and detach the beforeunload event listener
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isAudioPlaying) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAudioPlaying]);

  // Function to handle audio play event
  const handleAudioPlay = () => {
    setIsAudioPlaying(true);
  };

  // Function to handle audio pause event
  const handleAudioPause = () => {
    setIsAudioPlaying(false);
  };

  return (
    <div className="overlay">
      <img
        src={selectedPodcast.seasons[selectedSeasonIndex].image}
        alt={`Season ${selectedPodcast.seasons[selectedSeasonIndex].number}`}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FavoriteButton />
        <span style={{ marginLeft: '8px' }}>Add to Favorites</span>
      </div>
      <h2>{selectedPodcast.title}</h2>
      <p>{selectedPodcast.summary}</p>
      <h3>Seasons:</h3>
      <ul>
        {selectedPodcast.seasons.map((season, index) => (
          <li key={season.id}>
            <button
              onClick={() => handleSeasonSelect(index, season.number)}
              className={index === selectedSeasonIndex ? 'selected-season-button' : ''}
            >
              {season.title} ({season.episodes.length} episodes)
            </button>
          </li>
        ))}
      </ul>

      {selectedPodcast.seasons.length > 0 && (
        <div>
          <p>{selectedPodcast.seasons[selectedSeasonIndex].description}</p>
          <h5>Episodes:</h5>
          <ul>
            {selectedPodcast.seasons[selectedSeasonIndex].episodes.map((episode) => (
              <li key={episode.id}>
                <h6>Episode {episode.episode}</h6>
                <p>{episode.description}</p>
                <li key={episode.id}>
                  <audio
                    controls
                    onPlay={handleAudioPlay}
                    onPause={handleAudioPause}
                    onEnded={handleAudioPause}
                  >
                    <source src={episode.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </li>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PodcastDetailsSection;