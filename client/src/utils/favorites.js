import { APP_CONFIG } from '../config/constants';

/**
 * Get favorite items from localStorage
 * @returns {Array} Array of favorite item IDs
 */
export const getFavoriteItems = () => {
  return JSON.parse(localStorage.getItem(APP_CONFIG.favoritesKey) || '[]');
};

/**
 * Save favorite items to localStorage
 * @param {Array} items - Array of favorite item IDs
 */
export const saveFavoriteItems = (items) => {
  localStorage.setItem(APP_CONFIG.favoritesKey, JSON.stringify(items));
  window.dispatchEvent(new Event('favoritesUpdated'));
};

/**
 * Add item to favorites
 * @param {string} itemId - Product ID to add
 * @returns {boolean} Success status
 */
export const addToFavorites = (itemId) => {
  const favoriteItems = getFavoriteItems();
  if (!favoriteItems.includes(itemId)) {
    favoriteItems.push(itemId);
    saveFavoriteItems(favoriteItems);
    return true;
  }
  return false;
};

/**
 * Remove item from favorites
 * @param {string} itemId - Product ID to remove
 */
export const removeFromFavorites = (itemId) => {
  const favoriteItems = getFavoriteItems();
  const updatedFavorites = favoriteItems.filter(id => id !== itemId);
  saveFavoriteItems(updatedFavorites);
};

/**
 * Toggle item in favorites
 * @param {string} itemId - Product ID to toggle
 * @returns {boolean} New favorite status
 */
export const toggleFavorite = (itemId) => {
  const favoriteItems = getFavoriteItems();
  const isCurrentlyFavorite = favoriteItems.includes(itemId);
  
  if (isCurrentlyFavorite) {
    removeFromFavorites(itemId);
    return false;
  } else {
    addToFavorites(itemId);
    return true;
  }
};

/**
 * Check if item is in favorites
 * @param {string} itemId - Product ID to check
 * @returns {boolean} Whether item is in favorites
 */
export const isInFavorites = (itemId) => {
  const favoriteItems = getFavoriteItems();
  return favoriteItems.includes(itemId);
};

/**
 * Check if outfit is in favorites (both items)
 * @param {string} topId - Top product ID
 * @param {string} bottomId - Bottom product ID
 * @returns {boolean} Whether both items are in favorites
 */
export const isOutfitInFavorites = (topId, bottomId) => {
  const favoriteItems = getFavoriteItems();
  return favoriteItems.includes(topId) && favoriteItems.includes(bottomId);
};

/**
 * Toggle outfit in favorites (both items)
 * @param {string} topId - Top product ID
 * @param {string} bottomId - Bottom product ID
 * @returns {boolean} New outfit favorite status
 */
export const toggleOutfitFavorite = (topId, bottomId) => {
  const favoriteItems = getFavoriteItems();
  const isOutfitFavorite = isOutfitInFavorites(topId, bottomId);
  
  if (isOutfitFavorite) {
    // Remove both items
    const updatedFavorites = favoriteItems.filter(id => 
      id !== topId && id !== bottomId
    );
    saveFavoriteItems(updatedFavorites);
    return false;
  } else {
    // Add both items (if not already added)
    const itemsToAdd = [];
    if (!favoriteItems.includes(topId)) itemsToAdd.push(topId);
    if (!favoriteItems.includes(bottomId)) itemsToAdd.push(bottomId);
    
    const updatedFavorites = [...favoriteItems, ...itemsToAdd];
    saveFavoriteItems(updatedFavorites);
    return true;
  }
};

/**
 * Clear all favorites
 */
export const clearFavorites = () => {
  saveFavoriteItems([]);
}; 