import React, { useState, useRef, useEffect } from 'react';
import './CartoonWardrobe.css';
import { clothingItems } from '../OutfitBuilder/OutfitData';
import { useCart } from '../Cart/CartContext';
import { useWishlist } from '../Wishlist/WishlistContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faHeart as faHeartSolid, faTimes, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ConfettiGlitter from './ConfettiGlitter';
import getStyleSuggestionsAI from './aiStyleSuggestions';
import PopupWin2k from './PopupWin2k';
import StyleSuggestionsWin2k from './StyleSuggestionsWin2k';

const tops = clothingItems.tops.map(item => item.image);
const bottoms = clothingItems.bottoms.map(item => item.image);

const getTopObj = (idx) => clothingItems.tops[idx];
const getBottomObj = (idx) => clothingItems.bottoms[idx];

const CartoonWardrobe = () => {
  const [topIdx, setTopIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [popup, setPopup] = useState({ visible: false, message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const toolsRef = useRef();
  const { addToCart, removeFromCart, cart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestionsWin, setShowSuggestionsWin] = useState(false);
  const searchDropdownRef = useRef();
  const suggestionsDropdownRef = useRef();
  const cartDropdownRef = useRef();
  const favoritesDropdownRef = useRef();
  const toolsDropdownRef = useRef();
  const suggestionsMenuRef = useRef();
  const searchMenuRef = useRef();
  const cartMenuRef = useRef();
  const favoritesMenuRef = useRef();
  const toolsMenuRef = useRef();
  const menuBarRef = useRef();

  // Outfit suggestions (using available inventory)
  const outfitSuggestions = [
    {
      label: 'Streetwear',
      topIdx: 0,
      bottomIdx: 1,
      desc: 'Bold tee + relaxed jeans'
    },
    {
      label: 'Preppy',
      topIdx: 1,
      bottomIdx: 0,
      desc: 'Collared shirt + pleated pants'
    },
    {
      label: 'Minimalist',
      topIdx: 2,
      bottomIdx: 2,
      desc: 'Simple top + black trousers'
    }
  ];

  const handleSuggestionClick = (topIdx, bottomIdx) => {
    setTopIdx(topIdx);
    setBottomIdx(bottomIdx);
  };

  // Helper to show popup
  const showPopup = (message) => {
    setPopup({ visible: true, message });
    setTimeout(() => setPopup({ visible: false, message: '' }), 1700);
  };

  // Dropdown close handler for all dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setShowTools(false);
      }
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (suggestionsDropdownRef.current && !suggestionsDropdownRef.current.contains(event.target)) {
        setShowSuggestionsWin(false);
      }
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setShowCartPanel(false);
      }
      if (favoritesDropdownRef.current && !favoritesDropdownRef.current.contains(event.target)) {
        setShowFavorites(false);
      }
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target)) {
        setShowTools(false);
      }
    }
    if (showTools || showSearchDropdown || showSuggestionsWin || showCartPanel || showFavorites) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTools, showSearchDropdown, showSuggestionsWin, showCartPanel, showFavorites]);

  const nextTop = () => setTopIdx((topIdx + 1) % tops.length);
  const prevTop = () => setTopIdx((topIdx - 1 + tops.length) % tops.length);
  const nextBottom = () => setBottomIdx((bottomIdx + 1) % bottoms.length);
  const prevBottom = () => setBottomIdx((bottomIdx - 1 + bottoms.length) % bottoms.length);

  const handleSaveOutfit = () => {
    const top = getTopObj(topIdx);
    const bottom = getBottomObj(bottomIdx);
    if (top && bottom) {
      addToWishlist({
        id: `outfit-${top.id}-${bottom.id}`,
        type: 'outfit',
        top,
        bottom,
        name: `${top.name} + ${bottom.name} (Outfit)`,
        image: top.image
      });
      alert('Outfit (top + bottom) added to your wishlist!');
    } else if (top || bottom) {
      addToWishlist(top || bottom);
      alert('Item added to your wishlist!');
    } else {
      alert('Please select at least one item to save to your wishlist.');
    }
  };

  const handleAddToCart = () => {
    const top = getTopObj(topIdx);
    const bottom = getBottomObj(bottomIdx);
    const items = [top, bottom].filter(Boolean);
    if (items.length === 0) {
      alert('Please select at least one item to add to your cart.');
      return;
    }
    items.forEach(item => addToCart(item));
    alert('Outfit items added to your cart!');
  };

  // Check if current top/bottom is in cart
  const topObj = getTopObj(topIdx);
  const bottomObj = getBottomObj(bottomIdx);
  const topInCart = cart.some(item => item.id === topObj.id);
  const bottomInCart = cart.some(item => item.id === bottomObj.id);

  const handleAddTopToCart = () => {
    const top = getTopObj(topIdx);
    if (top && !topInCart) {
      addToCart(top);
      showPopup('Top added to your cart!');
    } else if (top && topInCart) {
      removeFromCart(top.id);
      showPopup('Top removed from your cart.');
    }
  };

  const handleAddBottomToCart = () => {
    const bottom = getBottomObj(bottomIdx);
    if (bottom && !bottomInCart) {
      addToCart(bottom);
      showPopup('Bottom added to your cart!');
    } else if (bottom && bottomInCart) {
      removeFromCart(bottom.id);
      showPopup('Bottom removed from your cart.');
    }
  };

  // Check if current top/bottom is in wishlist
  const topInWishlist = wishlist.some(item => item.id === topObj.id);
  const bottomInWishlist = wishlist.some(item => item.id === bottomObj.id);

  const handleAddTopToWishlist = () => {
    if (!topInWishlist) {
      addToWishlist(topObj);
      showPopup('Added to Favorites!');
    } else {
      removeFromWishlist(topObj.id);
      showPopup('Removed from Favorites.');
    }
  };

  const handleAddBottomToWishlist = () => {
    if (!bottomInWishlist) {
      addToWishlist(bottomObj);
      showPopup('Added to Favorites!');
    } else {
      removeFromWishlist(bottomObj.id);
      showPopup('Removed from Favorites.');
    }
  };

  // Windows 2000-style favorites panel
  const FavoritesPanel = () => (
    <div className="favorites-panel-win2k">
      <div className="favorites-panel-titlebar">
        <span>Favorites</span>
        <button className="favorites-panel-close" onClick={() => setShowFavorites(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="favorites-panel-content">
        {wishlist.length === 0 ? (
          <div className="favorites-empty">No favorites yet.</div>
        ) : (
          wishlist.map(item => (
            <div className="favorites-item" key={item.id}>
              <img src={item.image} alt={item.name} className="favorites-item-img" />
              <span className="favorites-item-name">{item.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Windows 2000-style Tools dropdown
  const ToolsDropdown = () => (
    <div className="tools-dropdown-win2k" ref={toolsRef}>
      <div className="tools-panel-titlebar">
        <span>Tools</span>
        <button className="tools-panel-close" onClick={() => setShowTools(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="tools-panel-content">
        <div className="tools-panel-item"><span className="tools-panel-icon"><b>💾</b></span> <span><b>Save Outfit</b>: Save the current top & bottom as an outfit to your Favorites.</span></div>
        <div className="tools-panel-item"><span className="tools-panel-icon"><b>🛒</b></span> <span><b>Add to Cart</b>: Add the current top & bottom to your shopping cart.</span></div>
        <div className="tools-panel-item"><span className="tools-panel-icon"><FontAwesomeIcon icon={faPlus} />/<FontAwesomeIcon icon={faMinus} /></span> <span><b>Plus/Minus Button</b>: Add or remove the current item (top or bottom) to/from your cart.</span></div>
        <div className="tools-panel-item"><span className="tools-panel-icon"><FontAwesomeIcon icon={faHeartSolid} /></span> <span><b>Heart/Unheart</b>: Add or remove an item from your Favorites (wishlist).</span></div>
        <div className="tools-panel-item"><span className="tools-panel-icon"><b>★</b></span> <span><b>Favorites</b>: View your saved items and outfits in a retro panel.</span></div>
      </div>
    </div>
  );

  // Windows 2000-style cart panel
  const CartPanel = () => (
    <div className="favorites-panel-win2k">
      <div className="favorites-panel-titlebar">
        <span>Cart</span>
        <button className="favorites-panel-close" onClick={() => setShowCartPanel(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div style={{ padding: '1rem 1.2rem 0.5rem 1.2rem', background: '#f4f4f4', borderBottom: '2px inset #b4b4b4' }}>
        <button className="cart-checkout-btn-win2k" onClick={e => {
          const rect = e.target.getBoundingClientRect();
          setConfettiOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          setShowConfetti(true);
          showPopup('Checkout started!');
          setTimeout(() => { setShowConfetti(false); navigate('/checkout'); }, 1200);
        }}>Checkout</button>
      </div>
      <div className="favorites-panel-content">
        {cart.length === 0 ? (
          <div className="favorites-empty">Your cart is empty.</div>
        ) : (
          cart.map(item => (
            <div className="favorites-item cart-panel-item" key={item.id}>
              <img src={item.image} alt={item.name} className="favorites-item-img" />
              <span className="favorites-item-name">{item.name}</span>
              <span className="cart-trash-wrap">
                <FontAwesomeIcon icon={faTrash} className="cart-trash-icon" onClick={() => { removeFromCart(item.id); showPopup('Removed from cart.'); }} />
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const [confettiOrigin, setConfettiOrigin] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const aiSuggestions = getStyleSuggestionsAI(clothingItems);

  return (
    <div className="cartoon-wardrobe-window wide">
      {showConfetti && <ConfettiGlitter onDone={() => setShowConfetti(false)} origin={confettiOrigin} />}
      <PopupWin2k
        visible={popup.visible}
        message={popup.message}
        onClose={() => setPopup({ visible: false, message: '' })}
      />
      <div className="cartoon-window-bar">
        <div className="cartoon-window-controls">
          <span className="cartoon-dot" style={{ background: '#fff' }}></span>
          <span className="cartoon-dot" style={{ background: '#fff' }}></span>
          <span className="cartoon-dot" style={{ background: '#fff' }}></span>
        </div>
        <div className="cartoon-title">Issue 1 June 2025</div>
        <div className="cartoon-window-buttons">
          <div className="cartoon-window-btn min" title="Minimize"></div>
          <div className="cartoon-window-btn max" title="Maximize"></div>
          <div className="cartoon-window-btn close" title="Close"></div>
        </div>
        <div className="cartoon-section">Fall Fashions</div>
      </div>
      <div className="cartoon-menu-bar" ref={menuBarRef} style={{ position: 'relative' }}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/about')}>About</span>
        <span ref={cartMenuRef} style={{ cursor: 'pointer', textDecoration: showCartPanel ? 'underline' : 'none', color: showCartPanel ? '#245edb' : undefined }}
          onClick={e => { e.preventDefault(); e.stopPropagation();
            const menuRect = menuBarRef.current.getBoundingClientRect();
            const itemRect = cartMenuRef.current.getBoundingClientRect();
            setCartDropdownPos({
              left: itemRect.left - menuRect.left,
              top: menuBarRef.current.offsetHeight
            });
            setShowCartPanel((v) => !v);
            setShowFavorites(false);
            setShowTools(false);
            setShowSuggestionsWin(false);
            setShowSearchDropdown(false);
          }}
        >Cart</span>
        <span ref={favoritesMenuRef} className="favorites-menu-item" style={{ cursor: 'pointer', textDecoration: showFavorites ? 'underline' : 'none', color: showFavorites ? '#245edb' : undefined }}
          onClick={e => { e.preventDefault(); e.stopPropagation();
            const menuRect = menuBarRef.current.getBoundingClientRect();
            const itemRect = favoritesMenuRef.current.getBoundingClientRect();
            setFavoritesDropdownPos({
              left: itemRect.left - menuRect.left,
              top: menuBarRef.current.offsetHeight
            });
            setShowFavorites((v) => !v);
            setShowCartPanel(false);
            setShowTools(false);
            setShowSuggestionsWin(false);
            setShowSearchDropdown(false);
          }}
        >Favorites</span>
        <span ref={toolsMenuRef} className="tools-menu-item" style={{ cursor: 'pointer', textDecoration: showTools ? 'underline' : 'none', color: showTools ? '#245edb' : undefined }}
          onClick={e => { e.preventDefault(); e.stopPropagation();
            const menuRect = menuBarRef.current.getBoundingClientRect();
            const itemRect = toolsMenuRef.current.getBoundingClientRect();
            setToolsDropdownPos({
              left: itemRect.left - menuRect.left,
              top: menuBarRef.current.offsetHeight
            });
            setShowTools((v) => !v);
            setShowCartPanel(false);
            setShowFavorites(false);
            setShowSuggestionsWin(false);
            setShowSearchDropdown(false);
          }}
        >Tools</span>
        <span ref={suggestionsMenuRef} style={{ cursor: 'pointer' }} onClick={e => { e.stopPropagation();
          const menuRect = menuBarRef.current.getBoundingClientRect();
          const itemRect = suggestionsMenuRef.current.getBoundingClientRect();
          setSuggestionsDropdownPos({
            left: itemRect.left - menuRect.left,
            top: menuBarRef.current.offsetHeight
          });
          setShowSuggestionsWin((v) => !v);
          setShowCartPanel(false);
          setShowFavorites(false);
          setShowTools(false);
          setShowSearchDropdown(false);
        }}>
          Suggestions
        </span>
        <span ref={searchMenuRef} style={{ cursor: 'pointer', marginLeft: '0.5rem' }} onClick={e => { e.stopPropagation();
          const menuRect = menuBarRef.current.getBoundingClientRect();
          const itemRect = searchMenuRef.current.getBoundingClientRect();
          setSearchDropdownPos({
            left: itemRect.left - menuRect.left,
            top: menuBarRef.current.offsetHeight
          });
          setShowSearchDropdown((v) => !v);
          setShowCartPanel(false);
          setShowFavorites(false);
          setShowTools(false);
          setShowSuggestionsWin(false);
        }}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        {showCartPanel && (
          <div ref={cartDropdownRef} style={{ position: 'absolute', top: cartDropdownPos.top, left: cartDropdownPos.left, zIndex: 300 }}>
            <CartPanel />
          </div>
        )}
        {showFavorites && (
          <div ref={favoritesDropdownRef} style={{ position: 'absolute', top: favoritesDropdownPos.top, left: favoritesDropdownPos.left, zIndex: 300 }}>
            <FavoritesPanel />
          </div>
        )}
        {showTools && (
          <div ref={toolsDropdownRef} style={{ position: 'absolute', top: toolsDropdownPos.top, left: toolsDropdownPos.left, zIndex: 300 }}>
            <ToolsDropdown />
          </div>
        )}
        {showSuggestionsWin && (
          <div ref={suggestionsDropdownRef} style={{ position: 'absolute', top: suggestionsDropdownPos.top, left: suggestionsDropdownPos.left, zIndex: 300 }}>
            <StyleSuggestionsWin2k
              suggestions={aiSuggestions}
              onSelect={handleSuggestionClick}
              onClose={() => setShowSuggestionsWin(false)}
              clothingItems={clothingItems}
              className="cartoon-suggestions-win2k"
            />
          </div>
        )}
        {showSearchDropdown && (
          <div ref={searchDropdownRef} style={{ position: 'absolute', top: searchDropdownPos.top, left: searchDropdownPos.left, zIndex: 300, background: '#fff', border: '2px solid #b4b4b4', borderRadius: 4, boxShadow: '2px 4px 0 0 #bbb', padding: '1rem', minWidth: 220 }}>
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Search..."
              style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: 2 }}
              autoFocus
            />
          </div>
        )}
      </div>
      <div className="cartoon-wardrobe-content">
        <div className="cartoon-main-pane">
          <div className="cartoon-actions-row">
            <button className="cartoon-main-btn" onClick={handleSaveOutfit}><span role="img" aria-label="Save"></span>Save Outfit</button>
            <span className="cartoon-actions-901">901</span>
            <button className="cartoon-main-btn" onClick={handleAddToCart}><span role="img" aria-label="Cart"></span>Add to Cart</button>
          </div>
          <div className="cartoon-clothing-slot">
            <div className="cartoon-carousel-row">
              <button className="cartoon-nav-btn" onClick={prevTop}>&#x25C0;&#x25C0;</button>
              <div className="cartoon-carousel-img-wrap">
                <button className="cartoon-heart-btn" onClick={handleAddTopToWishlist} title="Add Top to Wishlist" style={{background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faHeartSolid} className="cartoon-heart-center" style={{ color: topInWishlist ? '#e63946' : '#968576', transition: 'color 0.18s' }} />
                </button>
                <img src={tops[topIdx]} alt="Top" className="cartoon-carousel-img large" style={{cursor: 'pointer'}} onClick={() => navigate(`/product/${topObj.id}`)} />
                <button className="cartoon-plus-btn" onClick={handleAddTopToCart} title={topInCart ? "Remove Top from Cart" : "Add Top to Cart"}>
                  <FontAwesomeIcon icon={topInCart ? faMinus : faPlus} />
                </button>
              </div>
              <button className="cartoon-nav-btn" onClick={nextTop}>&#x25B6;&#x25B6;</button>
            </div>
          </div>
          <div className="cartoon-clothing-slot">
            <div className="cartoon-carousel-row">
              <button className="cartoon-nav-btn" onClick={prevBottom}>&#x25C0;&#x25C0;</button>
              <div className="cartoon-carousel-img-wrap">
                <button className="cartoon-heart-btn" onClick={handleAddBottomToWishlist} title="Add Bottom to Wishlist" style={{background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faHeartSolid} className="cartoon-heart-center" style={{ color: bottomInWishlist ? '#e63946' : '#968576', transition: 'color 0.18s' }} />
                </button>
                <img src={bottoms[bottomIdx]} alt="Bottom" className="cartoon-carousel-img large" style={{cursor: 'pointer'}} onClick={() => navigate(`/product/${bottomObj.id}`)} />
                <button className="cartoon-plus-btn" onClick={handleAddBottomToCart} title={bottomInCart ? "Remove Bottom from Cart" : "Add Bottom to Cart"}>
                  <FontAwesomeIcon icon={bottomInCart ? faMinus : faPlus} />
                </button>
              </div>
              <button className="cartoon-nav-btn" onClick={nextBottom}>&#x25B6;&#x25B6;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartoonWardrobe; 