import React, { useState, useEffect } from 'react';
// import ImagePreview from './ImagePreview';

export default function HomePage() {
  const [data, setData] = useState([]); // Use an empty array as initial state
  const [selectedPodcast, setSelectedPodcast] = useState(null); // To store the selected podcast details

  const apiGet = () => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((json) => {
        console.log(json); // Log the entire data array to the console
        setData(json);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    apiGet();
  }, []);

  // If data is an empty array (not yet fetched), display a loading message or return null.
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  // Function to fetch detailed information for a specific podcast
  const handleShowDetails = (podcastId) => {
    fetch(`https://podcast-api.netlify.app/id/${podcastId}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json); // Log the selected podcast details to the console
        setSelectedPodcast(json);
      })
      .catch((error) => {
        console.error('Error fetching podcast details:', error);
      });
  };

  return (
    <div>
      <ul className="card-list">
        {data.map((item) => (
          <li key={item.id} className="card-item">
            <div>
              <span className="user-id">{item.userId}</span>
              <img src={item.image} alt={item.title} />
              <span className="title">{item.title}</span>
              {<span className="title">Seasons: {item.seasons}</span>}
            </div>
            <button onClick={() => handleShowDetails(item.id)}>Show Details</button>
          </li>
        ))}
      </ul>

      {selectedPodcast && (
        <div>
          <h2>{selectedPodcast.title}</h2>
          <p>{selectedPodcast.summary}</p>
          <h3>Seasons:</h3>
          <ul>
            {selectedPodcast.seasons.map((season) => (
              <li key={season.id}>
                <h4>Season {season.number}</h4>
                <p>{season.summary}</p>
                <h5>Episodes:</h5>
                <ul>
                  {season.episodes.map((episode) => (
                    <li key={episode.id}>
                      <h6>{episode.title}</h6>
                      <p>{episode.description}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display the selected podcast object on the screen */}
      {selectedPodcast && <pre>{JSON.stringify(selectedPodcast, null, 2)}</pre>}
    </div>
  );
}
