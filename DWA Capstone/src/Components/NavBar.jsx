// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
       <h1>Podcast App</h1>
      </Link>
      <div className="navbar-links">
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/Favourites">
          Favourites List
        </Link>
        {/* Add more navigation links as needed */}
      </div>
    </nav>
  );
};

export default Navbar;
