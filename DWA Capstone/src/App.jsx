import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './Components/NavBar'

//Pages
import HomePage from './Components/HomePage'
import Favourites from './Components/Favourites'
// import Favourites from './Components/Favourites'


function App() {

  return (
    <BrowserRouter>
       <Navbar />

    <Routes>
      <Route path="/"element={<HomePage />} />
       <Route path="/Favourites" element={<Favourites />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
