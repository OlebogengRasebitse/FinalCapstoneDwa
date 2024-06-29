import React from 'react';

const Favourites = () => {
  return (
    <h1>FAVES</h1>
  )}
  export default Favourites;
  
// const Favourites = ({ favoriteEpisodes, data, genreMap }) => {
//   return (
//     <div>
//       <h2>Favourites Page</h2>
//       <ul>
//         {favoriteEpisodes.map((episodeId) => {
//           const episode = data.find((item) => item.id === episodeId);
//           if (!episode || !episode.genres) return null; // Check if episode or genres is not defined
//           return (
//             <li key={episodeId}>
//               <span>Episode ID: {episodeId}</span>
//               <br />
//               <span>Title: {episode.title}</span>
//               <br />
//               <span>Genre: {episode.genres.map((genreId) => genreMap[genreId]).join(', ')}</span>
//               <br />
            
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Favourites;
