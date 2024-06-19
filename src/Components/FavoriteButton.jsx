import React, { useState } from 'react';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle marking/unmarking the podcast as a favorite
  const handleFavoriteClick = () => {
    setIsFavorite((prevFavorite) => !prevFavorite);
  };

  return (
    <button onClick={handleFavoriteClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      {isFavorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
    </button>
  );
};

export default FavoriteButton;
