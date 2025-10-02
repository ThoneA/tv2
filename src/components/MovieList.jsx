import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { getMovies } from '../services/api';
import './MovieList.css';

/**
 * MovieList component for displaying the front page with a grid of movies
 */
const MovieList = ({ onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getMovies();
      
      // Extract movies from the TV2 API response structure
      let movieList = [];
      
      if (data?.feeds && data.feeds.length > 0 && data.feeds[0].content) {
        movieList = data.feeds[0].content;
      } else if (data?.items) {
        movieList = data.items;
      } else if (data?.content) {
        movieList = data.content;
      } else if (Array.isArray(data)) {
        movieList = data;
      }
      
      setMovies(movieList);
      
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setError(`Failed to load movies: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchMovies();
  };

  if (loading) {
    return (
      <div className="movie-list">
        <div className="movie-list__header">
          <h1>TV 2 Play Films</h1>
          <p>Loading movies...</p>
        </div>
        <div className="movie-list__grid">
          {/* Loading skeleton */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="movie-card movie-card--loading">
              <div className="movie-card__image-container"></div>
              <div className="movie-card__content">
                <div className="movie-card__title"></div>
                <div className="movie-card__description"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-list">
        <div className="movie-list__header">
          <h1>TV 2 Play Films</h1>
        </div>
        <div className="movie-list__error">
          <h2>🎬 Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleRetry} className="movie-list__retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list">
        <div className="movie-list__header">
          <h1>TV 2 Play Films</h1>
        </div>
        <div className="movie-list__empty">
          <h2>🎭 No movies found</h2>
          <p>We couldn't find any movies to display.</p>
          <button onClick={handleRetry} className="movie-list__retry-button">
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list">
      <div className="movie-list__header">
        <h1>TV 2 Play Films</h1>
        <p>Discover amazing movies and series</p>
      </div>
      
      <div className="movie-list__grid">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id || movie.url || index}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;