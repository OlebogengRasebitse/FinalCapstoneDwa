import React, { useState, useEffect } from 'react';
// import PodcastDetailsSection from './PodcastDetailsSection';
// import PodcastModal from './PodcastModal';
// import TitleFilter from './TitleFilter';
// import DateFilter from './DateFilter';
// import SearchFilter from './SearchFilter';
// import GenreFilter from './GenreFilter';
import DescriptionToggle from './DescriptionToggle';
// import Carousel from './Carousel';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [sortOrderTitle, setSortOrderTitle] = useState('az');
  // const [sortOrderDate, setSortOrderDate] = useState('dateAsc');
  // const [selectedGenre, setSelectedGenre] = useState('All');
  // const [searchQuery, setSearchQuery] = useState('');
  const [favoriteEpisodes, setFavoriteEpisodes] = useState(
    JSON.parse(localStorage.getItem('favoriteEpisodes')) || []
  );
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
        console.log('API data:', json); // Log API response
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
        console.log('Podcast details:', json); // Log podcast details
        setSelectedPodcast(json);
      })
      .catch((error) => {
        console.error('Error fetching podcast details:', error);
      });
  };

  const handleCloseModal = () => {
    setSelectedPodcast(null);
  };

  // const handleTitleSortChange = (value) => {
  //   setSortOrderTitle(value);
  // };

  // const handleDateSortChange = (value) => {
  //   setSortOrderDate(value);
  // };

  // const handleGenreChange = (value) => {
  //   setSelectedGenre(value);
  // };

  // const handleSearchQueryChange = (query) => {
  //   setSearchQuery(query);
  // };

  // const handleSortData = (data) => {
  //   let sortedData = [...data];

  //   if (sortOrderTitle === 'az') {
  //     sortedData.sort((a, b) => a.title.localeCompare(b.title));
  //   } else if (sortOrderTitle === 'za') {
  //     sortedData.sort((a, b) => b.title.localeCompare(a.title));
  //   }

  //   if (sortOrderDate === 'dateAsc') {
  //     sortedData.sort((a, b) => new Date(a.updated) - new Date(b.updated));
  //   } else if (sortOrderDate === 'dateDesc') {
  //     sortedData.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  //   }

  //   if (selectedGenre !== 'All') {
  //     sortedData = sortedData.filter((item) => item.genres.includes(Number(selectedGenre)));
  //   }

  //   if (searchQuery.trim() !== '') {
  //     const query = searchQuery.trim().toLowerCase();
  //     sortedData = sortedData.filter((item) => item.title.toLowerCase().includes(query));
  //   }

  //   return sortedData.map((item) => ({
  //     ...item,
  //     updated: formatDate(new Date(item.updated)),
  //   }));
  // };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const toggleFavoriteEpisode = (episodeId) => {
    let newFavorites;
    if (favoriteEpisodes.includes(episodeId)) {
      newFavorites = favoriteEpisodes.filter((id) => id !== episodeId);
    } else {
      newFavorites = [...favoriteEpisodes, episodeId];
    }

    setFavoriteEpisodes(newFavorites);
    localStorage.setItem('favoriteEpisodes', JSON.stringify(newFavorites));
  };

  const isEpisodeFavorite = (episodeId) => favoriteEpisodes.includes(episodeId);

  return (
    <div className="card-grid">
      {isLoading ? (
        <div>Loading Please Relax...</div>
      ) : (
        <ul className="card-list">
          {data.map((item) => (
            <li key={item.id} className="card-item">
              <div>
                <img src={item.image} alt={item.title} />
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
                <DescriptionToggle description={item.description} />
              </div>
              <button onClick={() => handleShowDetails(item.id)}>Show Details</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default HomePage;

