
import React, { useState, useEffect } from 'react';
import PodcastDetailsSection from './PodcastDetailsSection';
import PodcastModal from './PodcastModal';
import TitleFilter from './TittleFiltre';
import DateFilter from './DateFiltre';
import SearchFilter from './SearchFiltre';
import GenreFilter from './GenreFiltre';
import DescriptionToggle from './DiscriptionToggle';
// import FavoriteButton from './FavoriteButton';
import Carousel from './Carousel';
// import Favourites from './Favourites'; // Import the Favourites component

const HomePage = () => {
  const [data, setData] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrderTitle, setSortOrderTitle] = useState('az');
  const [sortOrderDate, setSortOrderDate] = useState('dateAsc');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const genreMap = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  const apiGet = () => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
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
      })
      .catch((error) => {
        console.error('Error fetching podcast details:', error);
      });
  };

  

  const handleCloseModal = () => {
    setSelectedPodcast(null);
  };

  const handleTitleSortChange = (value) => {
    setSortOrderTitle(value);
  };

  const handleDateSortChange = (value) => {
    setSortOrderDate(value);
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleSortData = (data) => {
    let sortedData = [...data];

    if (sortOrderTitle === 'az') {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrderTitle === 'za') {
      sortedData.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortOrderDate === 'dateAsc') {
      sortedData.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    } else if (sortOrderDate === 'dateDesc') {
      sortedData.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }

    if (selectedGenre !== 'All') {
      sortedData = sortedData.filter((item) => item.genres.includes(Number(selectedGenre)));
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.trim().toLowerCase();
      sortedData = sortedData.filter((item) => item.title.toLowerCase().includes(query));
    }

    sortedData = sortedData.map((item) => ({
      ...item,
      updated: formatDate(new Date(item.updated)),
    }));

    return sortedData;
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  
  // Function to handle adding/removing the episode from the favorites list
  const toggleFavoriteEpisode = async (episodeId) => {
    try {
      setIsLoading(true); // Set loading to true during the API call

      if (favoriteEpisodes.includes(episodeId)) {
        // Remove from favorites
        const newFavorites = favoriteEpisodes.filter((id) => id !== episodeId);
        setFavoriteEpisodes(newFavorites);
      } else {
        // Add to favorites
        setFavoriteEpisodes((prevFavorites) => [...prevFavorites, episodeId]);
      }

      // Update the favorites list in the backend (if applicable)
      // You can call an API here to update the user's favorites list in the backend

      setIsLoading(false); // Set loading to false after the API call
    } catch (error) {
      console.error('Error toggling favorite episode:', error);
      setIsLoading(false); // Set loading to false in case of an error
    }

    
  // Update Local Storage
  const favoritesString = JSON.stringify(favoriteEpisodes);
  localStorage.setItem('favoriteEpisodes', favoritesString);
  };

  const isEpisodeFavorite = (episodeId) => favoriteEpisodes.includes(episodeId);

  



  return (
    <div className="card-grid">
      <div className="filters">
        <TitleFilter onSortChange={handleTitleSortChange} />
        <DateFilter onSortChange={handleDateSortChange} />
        <GenreFilter onGenreChange={handleGenreChange} />
        <SearchFilter onSearchQueryChange={handleSearchQueryChange} />
      </div>
      <Carousel possibleShows={data} />
      {isLoading ? (
        <div>Loading Please Relax...</div>
      ) : (
        <ul className="card-list">
          {handleSortData(data).map((item) => (
            <li key={item.id} className="card-item">
              <div>
                <span className="user-id">{item.userId}</span>
                <img src={item.image} alt={item.title} />
                {/* Button to add/remove the episode from favorites */}
                <button onClick={() => toggleFavoriteEpisode(item.id)}>
                  {isEpisodeFavorite(item.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <span className="title">{item.title}</span>
                <br />
                <span className="genre">
                  Genre: {item.genres.map((genreId) => genreMap[genreId]).join(', ')}
                </span>
                <br />
                <span className="season">Seasons: {item.seasons}</span>
                <br />
                <span className="updated">Updated: {item.updated}</span>
                <br />
                <br />
                <DescriptionToggle description={item.description} />
              </div>
              <button onClick={() => handleShowDetails(item.id)}>Show Details</button>
            </li>
          ))}
        </ul>
        
      )}

{favoriteEpisodes.length > 0 && (
  <div className="favorite-episodes">
    <h2>Favorite Episodes:</h2>
    <ul>
      {favoriteEpisodes.map((episodeId) => {
        const episode = data.find((item) => item.id === episodeId);
        return (
          <li key={episodeId}>
            <span>Episode ID: {episodeId}</span>
            <br />
            <span>Title: {episode.title}</span>
            <br />
            <span>Genre: {episode.genres.map((genreId) => genreMap[genreId]).join(', ')}</span>
            <br />
            {/* Add other relevant information here */}
          </li>
        );
      })}
    </ul>
  </div>
)}

{selectedPodcast && (
        <PodcastModal
          podcast={selectedPodcast}
          onClose={() => setSelectedPodcast(null)}
          isAudioPlaying={isAudioPlaying}
        >
          <PodcastDetailsSection selectedPodcast={selectedPodcast} />
        </PodcastModal>
)}
</div>
);
};

export default HomePage;
