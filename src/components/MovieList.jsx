import React, { useState, useEffect } from 'react';
import CategorySection from './CategorySection';
import { getMovies } from '../services/api';
import './MovieList.css';

/**
 * MovieList component for displaying multiple categories of movies
 */
const MovieList = ({ onMovieClick }) => {
  const [categories, setCategories] = useState([]);
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
      
      // Extract categories (feeds) from the TV2 API response structure
      let categoryList = [];
      
      if (data?.feeds && Array.isArray(data.feeds)) {
        categoryList = data.feeds.filter(feed => feed.content && feed.content.length > 0);
      } else if (data?.items) {
        // Fallback: treat as single category
        categoryList = [{ content: data.items, section_title: 'Movies' }];
      } else if (data?.content) {
        // Fallback: treat as single category
        categoryList = [{ content: data.content, section_title: 'Movies' }];
      } else if (Array.isArray(data)) {
        // Fallback: treat as single category
        categoryList = [{ content: data, section_title: 'Movies' }];
      }
      
      setCategories(categoryList);
      
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
        <div className="movie-list__loading">
          {/* Loading skeleton for categories */}
          {Array.from({ length: 3 }).map((_, categoryIndex) => (
            <div key={categoryIndex} className="category-section">
              <div className="category-section__header">
                <div className="category-section__title category-section__title--loading"></div>
              </div>
              <div className="category-section__movies">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="category-section__movie-item">
                    <div className="movie-card movie-card--loading">
                      <div className="movie-card__image-container"></div>
                      <div className="movie-card__content">
                        <div className="movie-card__title"></div>
                        <div className="movie-card__description"></div>
                      </div>
                    </div>
                  </div>
                ))}
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

  if (!categories || categories.length === 0) {
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
        <p>Discover amazing movies and series across different categories</p>
      </div>
      
      <div className="movie-list__categories">
        {categories.map((category, index) => (
          <CategorySection
            key={category.id || index}
            category={category}
            onMovieClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;