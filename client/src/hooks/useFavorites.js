import { useState, useEffect } from 'react';
import { 
  getFavoriteItems,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  isInFavorites,
  isOutfitInFavorites,
  toggleOutfitFavorite,
  clearFavorites
} from '../utils/favorites';

/**
 * Custom hook for favorites management
 * @returns {Object} Favorites state and methods
 */
export const useFavorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites data
  const loadFavorites = () => {
    try {
      setIsLoading(true);
      const items = getFavoriteItems();
      setFavoriteItems(items);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavoriteItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize favorites and listen for updates
  useEffect(() => {
    loadFavorites();

    const handleFavoritesUpdate = () => loadFavorites();
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, []);

  // Favorites methods
  const addItem = (itemId) => {
    const success = addToFavorites(itemId);
    if (success) {
      loadFavorites(); // Refresh favorites data
    }
    return success;
  };

  const removeItem = (itemId) => {
    removeFromFavorites(itemId);
    loadFavorites(); // Refresh favorites data
  };

  const toggleItem = (itemId) => {
    const newStatus = toggleFavorite(itemId);
    loadFavorites(); // Refresh favorites data
    return newStatus;
  };

  const checkIsInFavorites = (itemId) => {
    return isInFavorites(itemId);
  };

  const checkIsOutfitInFavorites = (topId, bottomId) => {
    return isOutfitInFavorites(topId, bottomId);
  };

  const toggleOutfit = (topId, bottomId) => {
    const newStatus = toggleOutfitFavorite(topId, bottomId);
    loadFavorites(); // Refresh favorites data
    return newStatus;
  };

  const clear = () => {
    clearFavorites();
    loadFavorites(); // Refresh favorites data
  };

  return {
    // State
    favoriteItems,
    favoriteCount: favoriteItems.length,
    isLoading,
    isEmpty: favoriteItems.length === 0,
    
    // Methods
    addItem,
    removeItem,
    toggleItem,
    toggleOutfit,
    clear,
    isInFavorites: checkIsInFavorites,
    isOutfitInFavorites: checkIsOutfitInFavorites,
    refresh: loadFavorites
  };
}; 