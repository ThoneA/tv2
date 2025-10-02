import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMoviePoster } from '../services/api';
import './MovieDetail.css';

/**
 * MovieDetail component for displaying detailed movie information
 */
const MovieDetail = () => {
  const { movieUrl } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movieUrl) {
      fetchMovieDetails();
    }
  }, [movieUrl]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Decode the URL parameter
      const decodedUrl = decodeURIComponent(movieUrl);
      console.log('Fetching movie details for:', decodedUrl);
      
      const data = await getMovieDetails(decodedUrl);
      console.log('Movie detail data:', data);
      
      setMovie(data);
      
    } catch (err) {
      console.error('Failed to fetch movie details:', err);
      setError('Failed to load movie details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleRetry = () => {
    fetchMovieDetails();
  };

  if (loading) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__loading">
          <div className="movie-detail__loading-image"></div>
          <div className="movie-detail__loading-content">
            <div className="movie-detail__loading-title"></div>
            <div className="movie-detail__loading-description"></div>
            <div className="movie-detail__loading-meta"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__header">
          <button onClick={handleGoBack} className="movie-detail__back-button">
            ← Back to Movies
          </button>
        </div>
        <div className="movie-detail__error">
          <h2>🎬 Oops! Something went wrong</h2>
          <p>{error}</p>
          <div className="movie-detail__error-actions">
            <button onClick={handleRetry} className="movie-detail__retry-button">
              Try Again
            </button>
            <button onClick={handleGoBack} className="movie-detail__back-button--secondary">
              Back to Movies
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__header">
          <button onClick={handleGoBack} className="movie-detail__back-button">
            ← Back to Movies
          </button>
        </div>
        <div className="movie-detail__empty">
          <h2>🎭 Movie not found</h2>
          <p>We couldn't find the movie you're looking for.</p>
          <button onClick={handleGoBack} className="movie-detail__back-button--secondary">
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  // Get large poster URL for detail view
  const imageUrl = movie?.image?.src || movie?.image?.url;
  const posterUrl = imageUrl ? getMoviePoster(imageUrl, 600, 900) : '';

  return (
    <div className="movie-detail">
      <div className="movie-detail__header">
        <button onClick={handleGoBack} className="movie-detail__back-button">
          ← Back to Movies
        </button>
      </div>
      
      <div className="movie-detail__content">
        <div className="movie-detail__image-container">
          {posterUrl ? (
            <div className="movie-detail__image-wrapper">
              <img 
                src={posterUrl}
                alt={movie?.title || 'Movie poster'}
                className="movie-detail__image"
              />
              <div className="movie-detail__play-overlay">
                <div className="movie-detail__play-button">
                  <span className="movie-detail__play-icon">▶</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="movie-detail__placeholder">
              <span>No Image Available</span>
            </div>
          )}
        </div>
        
        <div className="movie-detail__info">
          <h1 className="movie-detail__title">
            {movie?.title || 'Untitled'}
          </h1>
          
          {movie?.description && (
            <p className="movie-detail__description">
              {movie.description}
            </p>
          )}
          
          <div className="movie-detail__meta">
            {movie?.duration && (
              <div className="movie-detail__meta-item">
                <span className="movie-detail__meta-label">Duration:</span>
                <span className="movie-detail__meta-value">{movie.duration}</span>
              </div>
            )}
            
            {movie?.genre && (
              <div className="movie-detail__meta-item">
                <span className="movie-detail__meta-label">Genre:</span>
                <span className="movie-detail__meta-value">{movie.genre}</span>
              </div>
            )}
            
            {movie?.year && (
              <div className="movie-detail__meta-item">
                <span className="movie-detail__meta-label">Year:</span>
                <span className="movie-detail__meta-value">{movie.year}</span>
              </div>
            )}
          </div>
          
          <div className="movie-detail__actions">
            <button className="movie-detail__watch-button">
              <span className="movie-detail__watch-icon">▶</span>
              Watch Now
            </button>
            <button className="movie-detail__favorite-button">
              <span className="movie-detail__favorite-icon">♡</span>
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;