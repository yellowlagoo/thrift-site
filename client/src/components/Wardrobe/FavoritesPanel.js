import React from 'react';
import { useWishlist } from '../../context/WishlistContext';

export function FavoritesPanel({ setShowFavorites }) {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="favorites-panel">
      <div className="panel-header">
        <span>Favorites</span>
        <button className="close-btn" onClick={() => setShowFavorites(false)}>&times;</button>
      </div>
      <div className="panel-content">
        {wishlistItems.length === 0 ? (
          <div className="empty-message">No favorites yet.</div>
        ) : (
          <div className="favorites-items">
            {wishlistItems.map(item => (
              <div className="favorite-item" key={item.id}>
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 