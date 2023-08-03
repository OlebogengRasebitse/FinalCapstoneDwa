import React, { useState, useEffect } from 'react';
import PodcastDetailsSection from './PodcastDetailsSection';
import PodcastModal from './PodcastModal';
import TitleFilter from './TittleFiltre';
import DateFilter from './DateFiltre';
import SearchFilter from './SearchFiltre';
import GenreFilter from './GenreFiltre';
import DescriptionToggle from './DiscriptionToggle';
import supabase from '../config/supabaseClient';
import FavoriteButton from './FavoriteButton';
import Carousel from './Carousel';

const HomePage = () => {

  console.log(supabase)

  const [data, setData] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrderTitle, setSortOrderTitle] = useState('az');
  const [sortOrderDate, setSortOrderDate] = useState('dateAsc');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
 

    

  const genreMap = {
    1:	'Personal Growth',
    2:	'True Crime and Investigative Journalism',
    3:	'History',
    4:	'Comedy',
    5:	'Entertainment',
    6:	'Business',
    7:	'Fiction',
    8:	'News',
    9:	'Kids and Family'
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
      sortedData.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    } else if (sortOrderDate === 'dateDesc') {
      sortedData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
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
      updated: new Date(item.updatedAt).toLocaleString(),
    }));

    return sortedData;
  };

  
  return (
    <div className="card-grid">
      <div className="filters">
        <TitleFilter onSortChange={handleTitleSortChange} />
        <DateFilter onSortChange={handleDateSortChange} />
        <GenreFilter onGenreChange={handleGenreChange} />
        <SearchFilter onSearchQueryChange={handleSearchQueryChange} />
      </div>
      <FavoriteButton />
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
                <FavoriteButton />
                <span className="title">{item.title}</span>
                <br />
                <span className="genre">Genre: {item.genres.map(genreId => genreMap[genreId]).join(', ')}</span>
                <br />
                <span className="season">Seasons: {item.seasons}</span>
                <br />
                <span className="updated">Updated: {item.updated}</span>
                <br />
                <br />
             
                <br />
                <DescriptionToggle description={item.description} />
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
