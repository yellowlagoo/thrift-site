import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faShoppingCart, 
  faMagic,
  faLock,
  faUnlock,
  faChevronLeft,
  faChevronRight,
  faInfoCircle,
  faCheck,
  faXmark,
  faTshirt
} from '@fortawesome/free-solid-svg-icons';
import './IntegratedOutfitBuilder.css';

const IntegratedOutfitBuilder = () => {
  // State for clothing items by category
  const [clothingItems, setClothingItems] = useState({
    tops: [],
    bottoms: [],
    dresses: [],
    shoes: [],
    accessories: []
  });
  
  // State for loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Current outfit state
  const [currentOutfit, setCurrentOutfit] = useState({
    tops: null,
    bottoms: null,
    shoes: null,
    accessories: null
  });
  
  // State for locked items and match score
  const [lockedItems, setLockedItems] = useState({
    tops: false,
    bottoms: false,
    shoes: false,
    accessories: false
  });
  const [matchScore, setMatchScore] = useState(0);
  
  // Scrollable refs
  const topsRef = useRef(null);
  const bottomsRef = useRef(null);
  const shoesRef = useRef(null);
  
  // Item preview modal
  const [previewItem, setPreviewItem] = useState(null);
  
  // Success notification state
  const [notification, setNotification] = useState(null);
  
  // Load clothing items on component mount
  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        setLoading(true);
        
        // Fetch data for all categories
        const response = await axios.get('/api/products');
        const products = response.data;
        
        // Organize products by category
        const categorizedProducts = {
          tops: products.filter(p => p.category === 'tops'),
          bottoms: products.filter(p => p.category === 'bottoms'),
          dresses: products.filter(p => p.category === 'dresses'),
          shoes: products.filter(p => p.category === 'shoes'),
          accessories: products.filter(p => p.category === 'accessories')
        };
        
        setClothingItems(categorizedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load wardrobe items. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchClothingItems();
  }, []);
  
  // Update match score whenever outfit changes
  useEffect(() => {
    if (Object.values(currentOutfit).filter(item => item !== null).length > 1) {
      calculateMatchScore();
    }
  }, [currentOutfit]);
  
  // Scroll carousel horizontally
  const scrollCarousel = (direction, carouselRef) => {
    if (!carouselRef.current) return;
    
    const scrollAmount = direction === 'left' ? -300 : 300;
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };
  
  // Calculate match score between items in the outfit
  const calculateMatchScore = () => {
    // In a real app, this would use a more sophisticated algorithm
    // For now, we'll generate a score between 1-5
    
    // Count how many items are in the outfit
    const itemCount = Object.values(currentOutfit).filter(item => item !== null).length;
    
    // Create a base score with some randomness
    let baseScore;
    
    // Check if tops and bottoms match well
    if (currentOutfit.tops && currentOutfit.bottoms) {
      // This is where you'd implement logic to determine if items match well
      // For demo, we'll use random logic with a bias toward higher scores
      const colorMatch = Math.random() > 0.3; // 70% chance they match
      baseScore = colorMatch ? 4 : 3;
    } else {
      baseScore = 3;
    }
    
    // Add some randomness within a range
    const finalScore = Math.min(5, baseScore + (Math.random() * 0.5));
    setMatchScore(finalScore);
  };
  
  // Select an item for the outfit
  const selectItem = (item, category) => {
    // Don't update if this category is locked
    if (lockedItems[category]) return;
    
    // Clear a dress if selecting a top or bottom (they're mutually exclusive)
    let updatedOutfit = { ...currentOutfit };
    
    if ((category === 'tops' || category === 'bottoms') && updatedOutfit.dresses) {
      updatedOutfit.dresses = null;
    }
    
    if (category === 'dresses' && (updatedOutfit.tops || updatedOutfit.bottoms)) {
      updatedOutfit.tops = null;
      updatedOutfit.bottoms = null;
    }
    
    // Update the outfit with the selected item
    updatedOutfit[category] = item;
    setCurrentOutfit(updatedOutfit);
    
    // Animate item selection
    animateItemSelection(item, category);
  };
  
  // Open item detail preview
  const openItemPreview = (item, e) => {
    e.stopPropagation(); // Prevent triggering selectItem
    setPreviewItem(item);
  };
  
  // Close item preview
  const closeItemPreview = () => {
    setPreviewItem(null);
  };
  
  // Toggle lock status for a category
  const toggleLock = (category) => {
    setLockedItems({
      ...lockedItems,
      [category]: !lockedItems[category]
    });
  };
  
  // Save current outfit
  const saveOutfit = () => {
    // Check if outfit has at least one item
    if (Object.values(currentOutfit).every(item => item === null)) {
      showNotification('Please select at least one item for your outfit!', 'error');
      return;
    }
    
    // This would connect to the backend to save the outfit
    console.log('Saved outfit:', currentOutfit);
    showNotification('Outfit saved to your favorites!', 'success');
  };
  
  // Add outfit items to cart
  const addToCart = () => {
    // Check if outfit has at least one item
    if (Object.values(currentOutfit).every(item => item === null)) {
      showNotification('Please select at least one item for your outfit!', 'error');
      return;
    }
    
    // Get names of items being added to cart
    const itemsAdded = [];
    Object.entries(currentOutfit).forEach(([category, item]) => {
      if (item) {
        itemsAdded.push(item.name);
      }
    });
    
    // This would add items to the cart in a real app
    console.log('Added to cart:', itemsAdded);
    showNotification(`Added to cart: ${itemsAdded.join(', ')}`, 'success');
  };
  
  // Get AI outfit suggestion
  const getAiSuggestion = () => {
    // This would use more sophisticated logic in a real app
    const suggestion = {};
    
    // Get a random item from each non-empty category
    Object.keys(clothingItems).forEach(category => {
      if (clothingItems[category].length > 0 && !lockedItems[category]) {
        const randomIndex = Math.floor(Math.random() * clothingItems[category].length);
        suggestion[category] = clothingItems[category][randomIndex];
      } else if (lockedItems[category]) {
        // Keep the locked items
        suggestion[category] = currentOutfit[category];
      }
    });
    
    // Make sure we don't have both dress and top/bottom
    if (suggestion.dresses) {
      suggestion.tops = null;
      suggestion.bottoms = null;
    }
    
    // Apply the suggestion
    setCurrentOutfit({
      ...currentOutfit,
      ...suggestion
    });
    
    // Show success message
    showNotification('AI has created your perfect outfit!', 'success');
  };
  
  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  // Animation for item selection
  const animateItemSelection = (item, category) => {
    // In a real app, this would create and animate a clone
    // For this demo, we'll just implement the animation with CSS classes
    const outfitSlot = document.getElementById(`${category}Slot`);
    if (outfitSlot) {
      outfitSlot.classList.add('item-added');
      setTimeout(() => {
        outfitSlot.classList.remove('item-added');
      }, 500);
    }
    
    // Animate match score update
    const matchScore = document.querySelector('.match-score');
    if (matchScore) {
      matchScore.classList.add('update-animation');
      setTimeout(() => {
        matchScore.classList.remove('update-animation');
      }, 300);
    }
  };
  
  // Render hearts for match score
  const renderHearts = () => {
    const hearts = [];
    const fullHearts = Math.floor(matchScore);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullHearts) {
        hearts.push(<span key={i} className="heart">♥</span>);
      } else {
        hearts.push(<span key={i} className="heart empty">♥</span>);
      }
    }
    
    return hearts;
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-icon"></div>
          <p>Loading your wardrobe...</p>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div className="outfit-studio">
      <div className="outfit-studio-header">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Digital Outfit Studio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Mix and match pieces to create your perfect look
        </motion.p>
      </div>
      
      {/* Main outfit builder container */}
      <motion.div 
        className="outfit-builder-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Left side: current outfit display */}
        <motion.div 
          className="outfit-display-panel"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="outfit-preview-header">
            <h2>Your Current Look</h2>
            <div className="match-score">
              <span>Style Match:</span>
              <div className="match-hearts">
                {renderHearts()}
              </div>
            </div>
          </div>
          
          <div className="outfit-mannequin">
            <div className="mannequin-top" id="topsSlot">
              {currentOutfit.tops ? (
                <>
                  <motion.img 
                    src={currentOutfit.tops.images[0]} 
                    alt={currentOutfit.tops.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <button 
                    className={`lock-button ${lockedItems.tops ? 'locked' : ''}`}
                    onClick={() => toggleLock('tops')}
                  >
                    <FontAwesomeIcon icon={lockedItems.tops ? faLock : faUnlock} />
                  </button>
                </>
              ) : (
                <div className="empty-slot">
                  <FontAwesomeIcon icon={faTshirt} className="empty-icon" />
                  <span>Select a top</span>
                </div>
              )}
            </div>
            
            <div className="mannequin-bottom" id="bottomsSlot">
              {currentOutfit.bottoms ? (
                <>
                  <motion.img 
                    src={currentOutfit.bottoms.images[0]} 
                    alt={currentOutfit.bottoms.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <button 
                    className={`lock-button ${lockedItems.bottoms ? 'locked' : ''}`}
                    onClick={() => toggleLock('bottoms')}
                  >
                    <FontAwesomeIcon icon={lockedItems.bottoms ? faLock : faUnlock} />
                  </button>
                </>
              ) : (
                <div className="empty-slot">
                  <FontAwesomeIcon icon={faTshirt} className="empty-icon" />
                  <span>Select bottoms</span>
                </div>
              )}
            </div>
            
            <div className="mannequin-shoes" id="shoesSlot">
              {currentOutfit.shoes ? (
                <>
                  <motion.img 
                    src={currentOutfit.shoes.images[0]} 
                    alt={currentOutfit.shoes.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <button 
                    className={`lock-button ${lockedItems.shoes ? 'locked' : ''}`}
                    onClick={() => toggleLock('shoes')}
                  >
                    <FontAwesomeIcon icon={lockedItems.shoes ? faLock : faUnlock} />
                  </button>
                </>
              ) : (
                <div className="empty-slot">
                  <FontAwesomeIcon icon={faTshirt} className="empty-icon" />
                  <span>Select shoes</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="outfit-actions">
            <motion.button 
              className="outfit-save-btn"
              onClick={saveOutfit}
              whileHover={{ y: -3, boxShadow: '0 6px 10px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faHeart} className="btn-icon" />
              Save Outfit
            </motion.button>
            <motion.button 
              className="outfit-buy-btn"
              onClick={addToCart}
              whileHover={{ y: -3, boxShadow: '0 6px 10px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="btn-icon" />
              Add All to Cart
            </motion.button>
            <motion.button 
              className="ai-suggestion-btn"
              onClick={getAiSuggestion}
              whileHover={{ y: -3, boxShadow: '0 6px 10px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faMagic} className="btn-icon" />
              Get AI Suggestion
            </motion.button>
          </div>
        </motion.div>
        
        {/* Right side: horizontal shopping panels */}
        <motion.div 
          className="shopping-panels"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Tops panel */}
          <div className="shopping-panel">
            <div className="panel-header">
              <h2>Tops</h2>
              <div className="panel-controls">
                <button 
                  className="scroll-btn" 
                  onClick={() => scrollCarousel('left', topsRef)}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button 
                  className="scroll-btn" 
                  onClick={() => scrollCarousel('right', topsRef)}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            
            <div className="items-carousel" ref={topsRef}>
              <div className="carousel-inner">
                {clothingItems.tops.map(item => (
                  <motion.div 
                    key={item._id} 
                    className={`item-card ${currentOutfit.tops && currentOutfit.tops._id === item._id ? 'selected' : ''}`}
                    onClick={() => selectItem(item, 'tops')}
                    whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0,0,0,0.1)' }}
                  >
                    <div className="item-image">
                      <img src={item.images[0]} alt={item.name} />
                      <button 
                        className="info-btn"
                        onClick={(e) => openItemPreview(item, e)}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </button>
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">${item.price.toFixed(2)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottoms panel */}
          <div className="shopping-panel">
            <div className="panel-header">
              <h2>Bottoms</h2>
              <div className="panel-controls">
                <button 
                  className="scroll-btn" 
                  onClick={() => scrollCarousel('left', bottomsRef)}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button 
                  className="scroll-btn" 
                  onClick={() => scrollCarousel('right', bottomsRef)}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            
            <div className="items-carousel" ref={bottomsRef}>
              <div className="carousel-inner">
                {clothingItems.bottoms.map(item => (
                  <motion.div 
                    key={item._id} 
                    className={`item-card ${currentOutfit.bottoms && currentOutfit.bottoms._id === item._id ? 'selected' : ''}`}
                    onClick={() => selectItem(item, 'bottoms')}
                    whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0,0,0,0.1)' }}
                  >
                    <div className="item-image">
                      <img src={item.images[0]} alt={item.name} />
                      <button 
                        className="info-btn"
                        onClick={(e) => openItemPreview(item, e)}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </button>
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">${item.price.toFixed(2)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Shoes panel */}
          <div className="shopping-panel">
            <div className="panel-header">
              <h2>Shoes</h2>
              <div className="panel-controls">
                <button 
                  className="scroll-btn" 
                  onClick={() => scrollCarousel('left', shoesRef)}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button 
                  className="scroll-btn" 
                  onClick={() => scrollCarousel('right', shoesRef)}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            
            <div className="items-carousel" ref={shoesRef}>
              <div className="carousel-inner">
                {clothingItems.shoes.map(item => (
                  <motion.div 
                    key={item._id} 
                    className={`item-card ${currentOutfit.shoes && currentOutfit.shoes._id === item._id ? 'selected' : ''}`}
                    onClick={() => selectItem(item, 'shoes')}
                    whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0,0,0,0.1)' }}
                  >
                    <div className="item-image">
                      <img src={item.images[0]} alt={item.name} />
                      <button 
                        className="info-btn"
                        onClick={(e) => openItemPreview(item, e)}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </button>
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">${item.price.toFixed(2)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Item Detail Preview Modal */}
      {previewItem && (
        <motion.div 
          className="item-preview-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="close-modal" onClick={closeItemPreview}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="preview-image">
              <motion.img 
                src={previewItem.images[0]} 
                alt={previewItem.name}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="preview-details">
              <h3>{previewItem.name}</h3>
              <p className="preview-price">${previewItem.price.toFixed(2)}</p>
              <p className="preview-description">{previewItem.description}</p>
              <div className="preview-actions">
                <motion.button 
                  className="preview-select-btn"
                  onClick={() => {
                    selectItem(previewItem, previewItem.category);
                    closeItemPreview();
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Outfit
                </motion.button>
                <motion.button 
                  className="preview-cart-btn"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Notification */}
      {notification && (
        <motion.div 
          className={`notification ${notification.type}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="notification-icon">
            <FontAwesomeIcon icon={notification.type === 'success' ? faCheck : faXmark} />
          </div>
          <p>{notification.message}</p>
        </motion.div>
      )}
    </div>
  );
};

export default IntegratedOutfitBuilder; 