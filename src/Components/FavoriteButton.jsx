import React, { useState } from 'react';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// const FavoriteButton = () => {
//   const [isFavorite, setIsFavorite] = useState(false);

//   // Function to handle marking/unmarking the podcast as a favorite
//   const handleFavoriteClick = () => {
//     setIsFavorite((prevFavorite) => !prevFavorite);
//   };

//   return (
//     <button onClick={handleFavoriteClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
//       {isFavorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
//     </button>
//   );
// };

// export default FavoriteButton;

// import { Heart, HeartFill } from 'rect-b'


// src/App.js

const FavoriteButton = () => {
    const [isFavorited, setIsFavorited] = useState(false);
  
    const toggleFavorite = () => {
      setIsFavorited(!isFavorited);
    };
  
    return (
      <button onClick={toggleFavorite}>
        {isFavorited ? 'Unfavorite' : 'Favorite'}
      </button>
    );
  };
  
  export default FavoriteButton;
