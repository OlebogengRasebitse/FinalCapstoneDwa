import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './Components/NavBar'

//Pages
import HomePage from './Components/HomePage'

import FavouritesList from './Components/FavouritesList'
// import Favourites from './Components/Favourites'


function App() {

  return (
    <BrowserRouter>
       <Navbar />

    <Routes>
      <Route path="/"element={<HomePage />} />
       <Route path="/FavouritesList" element={<FavouritesList />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
