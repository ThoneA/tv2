import React from 'react';
import MovieCard from './MovieCard';
import './CategorySection.css';

/**
 * CategorySection component for displaying a category of movies in a horizontal scroll
 */
const CategorySection = ({ category, onMovieClick }) => {
  if (!category || !category.content || category.content.length === 0) {
    return null;
  }

  return (
    <section className="category-section">
      <div className="category-section__header">
        <h2 className="category-section__title">
          {category.section_title || category.title || 'Movies'}
        </h2>
        {category.content.length > 0 && (
          <span className="category-section__count">
            {category.content.length} {category.content.length === 1 ? 'movie' : 'movies'}
          </span>
        )}
      </div>
      
      <div className="category-section__scroll-container">
        <div className="category-section__movies">
          {category.content.map((movie, index) => (
            <div key={movie.content_id || movie.gpid || index} className="category-section__movie-item">
              <MovieCard
                movie={movie}
                onClick={onMovieClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;