import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import './App.css';

function HomePage() {
  const navigate = useNavigate();

  const handleMovieClick = (movieUrl) => {
    // Encode the URL to safely pass it as a parameter
    const encodedUrl = encodeURIComponent(movieUrl);
    navigate(`/movie/${encodedUrl}`);
  };

  return <MovieList onMovieClick={handleMovieClick} />;
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieUrl" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
