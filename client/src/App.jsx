import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/Home';
import Generate from './pages/Generate';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
