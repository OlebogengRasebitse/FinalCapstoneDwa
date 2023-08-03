import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const FavoriteButton = ({ itemName }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle marking/unmarking the podcast as a favorite
  const handleFavoriteClick = () => {
    setIsFavorite((prevFavorite) => {
      const newFavoriteState = !prevFavorite;
      console.log(`Button Clicked! New favorite state for ${itemName}: ${newFavoriteState}`);
      return newFavoriteState;
    });
  };

  return (
    <button onClick={handleFavoriteClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      {isFavorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
    </button>
  );
};

export default FavoriteButton;
