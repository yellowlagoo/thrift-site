import React from 'react';

export function ToolsDropdown({ setShowTools }) {
  return (
    <div className="tools-dropdown">
      <div className="panel-header">
        <span>Tools</span>
        <button className="close-btn" onClick={() => setShowTools(false)}>&times;</button>
      </div>
      <div className="panel-content">
        <div className="tool-item">
          <span className="tool-icon">💾</span>
          <span className="tool-text">Save Outfit: Save the current top & bottom as an outfit to your Favorites.</span>
        </div>
        <div className="tool-item">
          <span className="tool-icon">🛒</span>
          <span className="tool-text">Add to Cart: Add the current top & bottom to your shopping cart.</span>
        </div>
        <div className="tool-item">
          <span className="tool-icon">＋/－</span>
          <span className="tool-text">Plus/Minus Button: Add or remove the current item (top or bottom) to/from your cart.</span>
        </div>
        <div className="tool-item">
          <span className="tool-icon">❤️</span>
          <span className="tool-text">Heart/Unheart: Add or remove an item from your Favorites (wishlist).</span>
        </div>
      </div>
    </div>
  );
} 