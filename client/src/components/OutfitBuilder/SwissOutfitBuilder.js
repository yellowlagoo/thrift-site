import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clothingItems, suggestedOutfits } from './OutfitData';
import { useCart } from '../Cart/CartContext';
import { useWishlist } from '../Wishlist/WishlistContext';
import './SwissOutfitBuilder.css';

const SwissOutfitBuilder = () => {
  const [selectedOutfit, setSelectedOutfit] = useState({
    top: null,
    bottom: null
  });
  const [matchScore, setMatchScore] = useState(0);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const selectItem = (itemId, category) => {
    // If the item is already selected, unselect it
    if (selectedOutfit[category] === itemId) {
      const newOutfit = { ...selectedOutfit, [category]: null };
      setSelectedOutfit(newOutfit);
      // Recalculate match score
      if (Object.values(newOutfit).filter(Boolean).length >= 2) {
        const score = Math.min(4 + Math.random(), 5);
        setMatchScore(score);
      } else {
        setMatchScore(0);
      }
      return;
    }
    // Otherwise, select the item
    const newOutfit = { ...selectedOutfit, [category]: itemId };
    setSelectedOutfit(newOutfit);
    if (Object.values(newOutfit).filter(Boolean).length >= 2) {
      const score = Math.min(4 + Math.random(), 5);
      setMatchScore(score);
    }
  };

  const findItemById = (itemId) => {
    if (!itemId) return null;
    
    // Search through all categories
    for (const category of Object.keys(clothingItems)) {
      const item = clothingItems[category].find(item => item.id === itemId);
      if (item) return item;
    }
    
    return null;
  };

  const handleMannequinDoubleClick = (itemId) => {
    if (itemId) {
      navigate(`/product/${itemId}`);
    }
  };

  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const halfStar = score - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="rating-hearts">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="heart">●</span>
        ))}
        {halfStar && <span className="heart">◐</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="heart empty">○</span>
        ))}
      </div>
    );
  };

  const tryOutfit = (outfit) => {
    setSelectedOutfit({
      top: outfit.top,
      bottom: outfit.bottom
    });
    setMatchScore(outfit.matchScore);
  };

  const handleSaveOutfit = () => {
    const top = findItemById(selectedOutfit.top);
    const bottom = findItemById(selectedOutfit.bottom);
    if (top && bottom) {
      // Save as a single outfit object
      addToWishlist({
        id: `outfit-${top.id}-${bottom.id}`,
        type: 'outfit',
        top,
        bottom,
        name: `${top.name} + ${bottom.name} (Outfit)`,
        image: top.image, // Use top image as preview
        price: `${top.price} + ${bottom.price}`
      });
      alert('Outfit (top + bottom) added to your wishlist!');
    } else if (top || bottom) {
      // Save single item
      const item = top || bottom;
      addToWishlist(item);
      alert('Item added to your wishlist!');
    } else {
      alert('Please select at least one item to save to your wishlist.');
    }
  };

  const handleAddToCart = () => {
    const items = [findItemById(selectedOutfit.top), findItemById(selectedOutfit.bottom)].filter(Boolean);
    if (items.length === 0) {
      alert('Please select at least one item to add to your cart.');
      return;
    }
    items.forEach(item => addToCart(item));
    alert('Outfit items added to your cart!');
  };

  return (
    <div className="swiss-container outfit-studio-swiss">
      <div className="outfit-header-swiss">
        <h1>DIGITAL WARDROBE</h1>
        <p>Create perfectly coordinated outfits with our intelligent wardrobe system</p>
      </div>

      <div className="outfit-builder-grid">
        {/* Left Panel - Outfit Preview */}
        <div className="outfit-preview-panel">
          <div className="preview-header">
            <h2>OUTFIT</h2>
            {matchScore > 0 && (
              <div className="match-rating">
                <span className="rating-label">MATCH:</span>
                {renderStars(matchScore)}
              </div>
            )}
          </div>

          <div className="preview-mannequin">
            <div className={`mannequin-item top ${selectedOutfit.top ? 'selected' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => handleMannequinDoubleClick(selectedOutfit.top)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMannequinDoubleClick(selectedOutfit.top);
                }
              }}
              style={{ cursor: selectedOutfit.top ? 'pointer' : 'default' }}
              aria-label={selectedOutfit.top ? `View details for ${findItemById(selectedOutfit.top)?.name}` : undefined}
            >
              {selectedOutfit.top ? (
                <img 
                  src={findItemById(selectedOutfit.top)?.image} 
                  alt={findItemById(selectedOutfit.top)?.name} 
                  style={{ objectFit: 'contain', maxHeight: '90%' }}
                />
              ) : (
                <div className="empty-slot">
                  <span className="empty-icon">T</span>
                  <span>SELECT TOP</span>
                </div>
              )}
            </div>

            <div className={`mannequin-item bottom ${selectedOutfit.bottom ? 'selected' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => handleMannequinDoubleClick(selectedOutfit.bottom)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMannequinDoubleClick(selectedOutfit.bottom);
                }
              }}
              style={{ cursor: selectedOutfit.bottom ? 'pointer' : 'default' }}
              aria-label={selectedOutfit.bottom ? `View details for ${findItemById(selectedOutfit.bottom)?.name}` : undefined}
            >
              {selectedOutfit.bottom ? (
                <img 
                  src={findItemById(selectedOutfit.bottom)?.image} 
                  alt={findItemById(selectedOutfit.bottom)?.name}
                  style={{ objectFit: 'contain', maxHeight: '95%' }}
                />
              ) : (
                <div className="empty-slot">
                  <span className="empty-icon">B</span>
                  <span>SELECT BOTTOMS</span>
                </div>
              )}
            </div>
          </div>

          <div className="outfit-actions">
            <button className="btn-swiss btn-secondary-swiss" onClick={handleSaveOutfit}>
              SAVE OUTFIT
            </button>
            <button className="btn-swiss btn-primary-swiss" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Right Panel - Selection Grid */}
        <div className="selection-panels">
          {/* Tops Section */}
          <div className="category-panel">
            <div className="category-header">
              <h3 className="category-title tops">TOPS</h3>
            </div>
            <div className="items-grid">
              {clothingItems.tops.map(item => (
                <button 
                  key={item.id}
                  className={`item-card-swiss tops ${selectedOutfit.top === item.id ? 'selected' : ''}`}
                  onClick={() => selectItem(item.id, 'top')}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      selectItem(item.id, 'top');
                    }
                  }}
                  aria-pressed={selectedOutfit.top === item.id}
                  aria-label={`Select ${item.name} as top`}
                  tabIndex={0}
                  type="button"
                >
                  <div className="item-image-container">
                    <img src={item.image} alt={item.name} />
                    {selectedOutfit.top === item.id && (
                      <div className="selected-marker">✓</div>
                    )}
                  </div>
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottoms Section */}
          <div className="category-panel">
            <div className="category-header">
              <h3 className="category-title bottoms">BOTTOMS</h3>
            </div>
            <div className="items-grid">
              {clothingItems.bottoms.map(item => (
                <button 
                  key={item.id}
                  className={`item-card-swiss bottoms ${selectedOutfit.bottom === item.id ? 'selected' : ''}`}
                  onClick={() => selectItem(item.id, 'bottom')}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      selectItem(item.id, 'bottom');
                    }
                  }}
                  aria-pressed={selectedOutfit.bottom === item.id}
                  aria-label={`Select ${item.name} as bottom`}
                  tabIndex={0}
                  type="button"
                >
                  <div className="item-image-container">
                    <img src={item.image} alt={item.name} />
                    {selectedOutfit.bottom === item.id && (
                      <div className="selected-marker">✓</div>
                    )}
                  </div>
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Combinations */}
          <div className="combinations-panel">
            <h3 className="swiss-title">SUGGESTED COMBINATIONS</h3>
            <div className="combo-grid">
              {suggestedOutfits.map(outfit => (
                <div key={outfit.id} className="combo-card">
                  <div className="combo-title">{outfit.name.toUpperCase()}</div>
                  <div className="combo-rating">MATCH SCORE: {outfit.matchScore}/5</div>
                  <p>{outfit.description}</p>
                  <button 
                    className="combo-btn"
                    onClick={() => tryOutfit(outfit)}
                  >
                    TRY THIS COMBINATION
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwissOutfitBuilder; 