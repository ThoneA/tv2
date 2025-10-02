// API service functions for TV 2 Play movie data

/**
 * Fetches the list of movies from TV 2 Play API
 * @returns {Promise<Object>} Movie collection data
 */
export async function getMovies() {
  try {
    const response = await fetch('/api/v4/feeds/page_01jwxh2p1me02sbhyxmht24cbp');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

/**
 * Fetches detailed information about a specific movie
 * @param {string} movieUrl - The URL path for the movie
 * @returns {Promise<Object>} Movie details data
 */
export async function getMovieDetails(movieUrl) {
  try {
    const response = await fetch(`/api/v4/content/path/${movieUrl}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Movie details:', data);
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

/**
 * Generates optimized movie poster URL with specified dimensions
 * @param {string} imageUrl - Original image URL
 * @param {number} width - Desired width (default: 300)
 * @param {number} height - Desired height (default: 450)
 * @returns {string} Optimized poster URL
 */
export function getMoviePoster(imageUrl, width = 300, height = 450) {
  if (!imageUrl) return '';
  
  // TV2 uses image-pack URLs, we can add dimensions as query parameters
  const url = new URL(imageUrl);
  url.searchParams.set('width', width.toString());
  url.searchParams.set('height', height.toString());
  url.searchParams.set('fit', 'crop');
  
  return url.toString();
}

/**
 * Safe API call wrapper with error handling
 * @param {string} url - API endpoint URL
 * @returns {Promise<Object|null>} Response data or null if error
 */
export async function safeApiCall(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    return null;
  }
}