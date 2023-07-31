// HomePage.js

import React, { useState, useEffect } from 'react';
import PodcastDetailsSection from './PodcastDetailsSection';
import PodcastModal from './PodcastModal';
import PodcastFilter from './PodcastFiltre';


const HomePage = () => {
  const [data, setData] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('az'); // Default: A-Z
  const [sortOrderDate, setSortOrderDate] = useState('dateAsc'); // Default: Date Updated (Ascending)

  const apiGet = () => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
        setIsLoading(false); // Set isLoading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set isLoading to false on error as well
      });
  };

  useEffect(() => {
    apiGet();
  }, []);

  const handleShowDetails = (podcastId) => {
    fetch(`https://podcast-api.netlify.app/id/${podcastId}`)
      .then((response) => response.json())
      .then((json) => {
        setSelectedPodcast(json);
        setModalOpen(true); // Open the modal when podcast details are fetched
      })
      .catch((error) => {
        console.error('Error fetching podcast details:', error);
      });
  };

  const handleCloseModal = () => {
    setSelectedPodcast(null);
    setModalOpen(false);
  };

  
 // Function to handle sorting change for title
 const handleTitleSortChange = (sortOrder) => {
  setSortOrderTitle(sortOrder);
};

// Function to handle sorting change for date
const handleDateSortChange = (sortOrder) => {
  setSortOrderDate(sortOrder);
};

  // Function to sort data based on selected sort order
  const sortedData = data.slice().sort((a, b) => {
    if (sortOrder === 'az') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  


  return (
    <div className="card-grid">
     <PodcastFilter onTitleSortChange={handleTitleSortChange} onDateSortChange={handleDateSortChange} />
      {isLoading ? (
        <div>Loading Please Relax...</div>
      ) : (
        <ul className="card-list">
          {sortedData.map((item) => (
            <li key={item.id} className="card-item">
              <div>
                <span className="user-id">{item.userId}</span>
                <img src={item.image} alt={item.title} />
                <span className="title">{item.title}</span>
                <br />
                <span className="genre">Genre:{item.genres}</span>
                <br />
                <span className="title">Seasons:{item.seasons}</span>
                <br />
                {/* <span className="description">{item.description}</span> */}
              </div>
              <button onClick={() => handleShowDetails(item.id)}>Show Details</button>
            </li>
          ))}
        </ul>
      )}

      {selectedPodcast && (
        <PodcastModal podcast={selectedPodcast} onClose={handleCloseModal}>
          <PodcastDetailsSection selectedPodcast={selectedPodcast} />
        </PodcastModal>
      )}
    </div>
  );
};

export default HomePage;
