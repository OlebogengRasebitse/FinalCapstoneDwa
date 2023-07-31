// PodcastDetailsSection.js

import React, { useState } from 'react';

const PodcastDetailsSection = ({ selectedPodcast }) => {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);

  // Function to handle season selection
  const handleSeasonSelect = (seasonIndex) => {
    setSelectedSeasonIndex(seasonIndex);
  };

  return (
    <div className='overlay'>
         <img
            src={selectedPodcast.seasons[selectedSeasonIndex].image}
            alt={`Season ${selectedPodcast.seasons[selectedSeasonIndex].number}`}
          />
      <h2>{selectedPodcast.title}</h2>
      <p>{selectedPodcast.summary}</p>
      <h3>Seasons:</h3>
      <ul>
        {selectedPodcast.seasons.map((season, index) => (
          <li key={season.id}>
            <button onClick={() => handleSeasonSelect(index)}>
              Season {season.number}
            </button>
          </li>
        ))}
      </ul>
      
      {selectedPodcast.seasons.length > 0 && (
        <div>
          <h4>Season {selectedPodcast.seasons[selectedSeasonIndex].number}</h4>
         
          <p>{selectedPodcast.seasons[selectedSeasonIndex].description}</p>
          <h5>Episodes:</h5>
          <ul>
            {selectedPodcast.seasons[selectedSeasonIndex].episodes.map((episode) => (
              <li key={episode.id}>
                <h6>{episode.title}</h6>
                <p>{episode.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PodcastDetailsSection;
