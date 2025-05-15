import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faLock, 
  faUnlock, 
  faHeart, 
  faShoppingCart, 
  faRobot, 
  faStar, 
  faStarHalf, 
  faComputer, 
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import { clothingItems, suggestedOutfits } from './OutfitData';
import '../OutfitBuilder/IntegratedOutfitBuilder.css';

const OutfitBuilder = () => {
  const [selectedOutfit, setSelectedOutfit] = useState({
    top: null,
    bottom: null,
    shoes: null
  });
  const [matchScore, setMatchScore] = useState(0);
  const [showStyleWizard, setShowStyleWizard] = useState(false);

  const selectItem = (itemId, category) => {
    const newOutfit = { ...selectedOutfit, [category]: itemId };
    setSelectedOutfit(newOutfit);
    
    // Calculate match score if we have at least two items selected
    if (Object.values(newOutfit).filter(Boolean).length >= 2) {
      // Simple scoring logic - could be more sophisticated
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

  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const halfStar = score - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="match-hearts">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="heart">❤️</span>
        ))}
        {halfStar && <span className="heart">💗</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="heart empty">♡</span>
        ))}
      </div>
    );
  };

  const toggleStyleWizard = () => {
    setShowStyleWizard(!showStyleWizard);
  };

  return (
    <div className="outfit-studio">
      <div className="outfit-studio-header">
        <h1 className="cursive-heading">901 Digital Wardrobe</h1>
        <p>Mix & match pieces to create your perfect vintage-inspired look</p>
      </div>

      <div className="outfit-builder-container">
        {/* Left panel - Outfit display */}
        <div className="outfit-display-panel">
          <div className="outfit-preview-header">
            <h2 className="cursive-heading">Your Outfit</h2>
            {matchScore > 0 && (
              <div className="match-score">
                <span>Style Match:</span>
                {renderStars(matchScore)}
              </div>
            )}
          </div>

          <div className="outfit-mannequin">
            <div className={`mannequin-top ${selectedOutfit.top ? 'item-added' : ''}`}>
              {selectedOutfit.top ? (
                <img 
                  src={findItemById(selectedOutfit.top)?.image} 
                  alt={findItemById(selectedOutfit.top)?.name} 
                />
              ) : (
                <div className="empty-slot">
                  <span className="empty-icon">👕</span>
                  <span>Select a top</span>
                </div>
              )}
            </div>

            <div className={`mannequin-bottom ${selectedOutfit.bottom ? 'item-added' : ''}`}>
              {selectedOutfit.bottom ? (
                <img 
                  src={findItemById(selectedOutfit.bottom)?.image} 
                  alt={findItemById(selectedOutfit.bottom)?.name} 
                />
              ) : (
                <div className="empty-slot">
                  <span className="empty-icon">👖</span>
                  <span>Select bottoms</span>
                </div>
              )}
            </div>

            <div className={`mannequin-shoes ${selectedOutfit.shoes ? 'item-added' : ''}`}>
              {selectedOutfit.shoes ? (
                <img 
                  src={findItemById(selectedOutfit.shoes)?.image} 
                  alt={findItemById(selectedOutfit.shoes)?.name} 
                />
              ) : (
                <div className="empty-slot">
                  <span className="empty-icon">👟</span>
                  <span>Select shoes</span>
                </div>
              )}
            </div>
          </div>

          <div className="outfit-actions">
            <button className="outfit-save-btn">
              <span className="btn-icon">💾</span> Save Outfit
            </button>
            <button className="outfit-buy-btn">
              <span className="btn-icon">🛒</span> Add to Cart
            </button>
          </div>
        </div>

        {/* Right panel - Shopping panels */}
        <div className="shopping-panels">
          {/* Tops Panel */}
          <div className="shopping-panel">
            <div className="panel-header">
              <h2>Tops</h2>
              <div className="panel-controls">
                <button className="scroll-btn">←</button>
                <button className="scroll-btn">→</button>
              </div>
            </div>
            <div className="items-carousel">
              <div className="carousel-inner">
                {clothingItems.tops.map(item => (
                  <div 
                    key={item.id}
                    className={`item-card ${selectedOutfit.top === item.id ? 'selected' : ''}`}
                    onClick={() => selectItem(item.id, 'top')}
                  >
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottoms Panel */}
          <div className="shopping-panel">
            <div className="panel-header">
              <h2>Bottoms</h2>
              <div className="panel-controls">
                <button className="scroll-btn">←</button>
                <button className="scroll-btn">→</button>
              </div>
            </div>
            <div className="items-carousel">
              <div className="carousel-inner">
                {clothingItems.bottoms.map(item => (
                  <div 
                    key={item.id}
                    className={`item-card ${selectedOutfit.bottom === item.id ? 'selected' : ''}`}
                    onClick={() => selectItem(item.id, 'bottom')}
                  >
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shoes Panel */}
          <div className="shopping-panel">
            <div className="panel-header">
              <h2>Shoes</h2>
              <div className="panel-controls">
                <button className="scroll-btn">←</button>
                <button className="scroll-btn">→</button>
              </div>
            </div>
            <div className="items-carousel">
              <div className="carousel-inner">
                {clothingItems.shoes.map(item => (
                  <div 
                    key={item.id}
                    className={`item-card ${selectedOutfit.shoes === item.id ? 'selected' : ''}`}
                    onClick={() => selectItem(item.id, 'shoes')}
                  >
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Suggested Outfits */}
          <div className="shopping-panel">
            <div className="panel-header">
              <h2 className="cursive-heading">Suggested Looks</h2>
            </div>
            <div className="important-feature">Try These Stylish Combinations</div>
            <div className="items-carousel">
              <div className="carousel-inner">
                {suggestedOutfits.map(outfit => (
                  <div key={outfit.id} className="item-card">
                    <div className="item-info">
                      <div className="item-name cursive-subheading">{outfit.name}</div>
                      <div className="item-price">{outfit.matchScore} ★</div>
                      <button 
                        className="btn-primary"
                        onClick={() => {
                          setSelectedOutfit({
                            top: outfit.top,
                            bottom: outfit.bottom,
                            shoes: outfit.shoes
                          });
                          setMatchScore(outfit.matchScore);
                        }}
                      >
                        Try This Look
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitBuilder; 