import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/wave-sound.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
      <div className='navbar-brand'>
      <img src={logo} alt="PodcastApp Logo" className="navbar-logo" height='90px' />
      <h2>PodcastApp</h2>
      </div>
      </Link>
      <div className="navbar-links">
        <Link className="navbar-link" to="/">
        </Link>
        <Link className="navbar-link" to="/Favourites">
          Favourites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
