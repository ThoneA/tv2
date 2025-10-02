import React from 'react';
import { getMoviePoster } from '../services/api';
import './MovieCard.css';

/**
 * MovieCard component for displaying individual movie information
 * @param {Object} props
 * @param {Object} props.movie - Movie data object
 * @param {Function} props.onClick - Click handler for navigation
 */
const MovieCard = ({ movie, onClick }) => {
  const handleClick = () => {
    if (onClick && movie?.url) {
      onClick(movie.url);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  // Get poster URL with appropriate dimensions for list view
  const imageUrl = movie?.image?.src || movie?.image?.url;
  const posterUrl = imageUrl ? getMoviePoster(imageUrl, 300, 450) : '';

  return (
    <div 
      className="movie-card"
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${movie?.title || 'movie'}`}
    >
      <div className="movie-card__image-container">
        {posterUrl ? (
          <img 
            src={posterUrl}
            alt={movie?.title || 'Movie poster'}
            className="movie-card__image"
            loading="lazy"
          />
        ) : (
          <div className="movie-card__placeholder">
            <span>No Image</span>
          </div>
        )}
      </div>
      
      <div className="movie-card__content">
        <h3 className="movie-card__title">
          {movie?.title || 'Untitled'}
        </h3>
        
        {movie?.description && (
          <p className="movie-card__description">
            {movie.description.length > 100 
              ? `${movie.description.substring(0, 100)}...` 
              : movie.description
            }
          </p>
        )}
        
        {movie?.duration && (
          <span className="movie-card__duration">
            {movie.duration}
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieCard;