import React from 'react';
import './old/CartoonWardrobe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faHeart as faHeartSolid, faTimes, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

// Presentational component for the wardrobe window
export function WardrobeView({
  topIdx,
  bottomIdx,
  tops,
  bottoms,
  topObj,
  bottomObj,
  topInCart,
  bottomInCart,
  topInWishlist,
  bottomInWishlist,
  onPrevTop,
  onNextTop,
  onPrevBottom,
  onNextBottom,
  onAddTopToCart,
  onAddBottomToCart,
  onAddTopToWishlist,
  onAddBottomToWishlist,
  onSaveOutfit,
  onAddToCart,
  menuBar,
  children
}) {
  return (
    <div className="cartoon-wardrobe-window wide">
      {menuBar}
      <div className="cartoon-wardrobe-content">
        <div className="cartoon-main-pane">
          <div className="cartoon-actions-row">
            <button className="cartoon-main-btn" onClick={onSaveOutfit}><span role="img" aria-label="Save"></span>Save Outfit</button>
            <span className="cartoon-actions-901">901</span>
            <button className="cartoon-main-btn" onClick={onAddToCart}><span role="img" aria-label="Cart"></span>Add to Cart</button>
          </div>
          <div className="cartoon-clothing-slot">
            <div className="cartoon-carousel-row">
              <button className="cartoon-nav-btn" onClick={onPrevTop}>&#x25C0;&#x25C0;</button>
              <div className="cartoon-carousel-img-wrap">
                <button className="cartoon-heart-btn" onClick={onAddTopToWishlist} title="Add Top to Wishlist" style={{background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faHeartSolid} className="cartoon-heart-center" style={{ color: topInWishlist ? '#e63946' : '#968576', transition: 'color 0.18s' }} />
                </button>
                <img src={tops[topIdx]} alt="Top" className="cartoon-carousel-img large" style={{cursor: 'pointer'}} />
                <button className="cartoon-plus-btn" onClick={onAddTopToCart} title={topInCart ? "Remove Top from Cart" : "Add Top to Cart"}>
                  <FontAwesomeIcon icon={topInCart ? faMinus : faPlus} />
                </button>
              </div>
              <button className="cartoon-nav-btn" onClick={onNextTop}>&#x25B6;&#x25B6;</button>
            </div>
          </div>
          <div className="cartoon-clothing-slot">
            <div className="cartoon-carousel-row">
              <button className="cartoon-nav-btn" onClick={onPrevBottom}>&#x25C0;&#x25C0;</button>
              <div className="cartoon-carousel-img-wrap">
                <button className="cartoon-heart-btn" onClick={onAddBottomToWishlist} title="Add Bottom to Wishlist" style={{background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer'}}>
                  <FontAwesomeIcon icon={faHeartSolid} className="cartoon-heart-center" style={{ color: bottomInWishlist ? '#e63946' : '#968576', transition: 'color 0.18s' }} />
                </button>
                <img src={bottoms[bottomIdx]} alt="Bottom" className="cartoon-carousel-img large" style={{cursor: 'pointer'}} />
                <button className="cartoon-plus-btn" onClick={onAddBottomToCart} title={bottomInCart ? "Remove Bottom from Cart" : "Add Bottom to Cart"}>
                  <FontAwesomeIcon icon={bottomInCart ? faMinus : faPlus} />
                </button>
              </div>
              <button className="cartoon-nav-btn" onClick={onNextBottom}>&#x25B6;&#x25B6;</button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function WardrobeMenuBar({
  menuBarRef,
  cartMenuRef,
  favoritesMenuRef,
  toolsMenuRef,
  suggestionsMenuRef,
  searchMenuRef,
  onCartClick,
  onFavoritesClick,
  onToolsClick,
  onSuggestionsClick,
  onSearchClick,
  cartDropdown,
  favoritesDropdown,
  toolsDropdown,
  suggestionsDropdown,
  searchDropdown
}) {
  const location = useLocation();
  return (
    <>
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
        <Link
          to="/"
          className={`menu-link${location.pathname === '/' ? ' active' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/cart"
          className={`menu-link${location.pathname === '/cart' ? ' active' : ''}`}
          ref={cartMenuRef}
          onClick={onCartClick}
        >
          Cart
        </Link>
        <Link
          to="/favorites"
          className={`menu-link${location.pathname === '/favorites' ? ' active' : ''}`}
          ref={favoritesMenuRef}
          onClick={onFavoritesClick}
        >
          Favorites
        </Link>
        <Link
          to="/tools"
          className={`menu-link${location.pathname === '/tools' ? ' active' : ''}`}
          ref={toolsMenuRef}
          onClick={onToolsClick}
        >
          Tools
        </Link>
        <Link
          to="/suggestions"
          className={`menu-link${location.pathname === '/suggestions' ? ' active' : ''}`}
          ref={suggestionsMenuRef}
          onClick={onSuggestionsClick}
        >
          Suggestions
        </Link>
        <button 
          className="menu-link"
          ref={searchMenuRef}
          onClick={onSearchClick}
          aria-label="Search"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {cartDropdown}
        {favoritesDropdown}
        {toolsDropdown}
        {suggestionsDropdown}
        {searchDropdown}
      </div>
    </>
  );
}

// CartPanel presentational component
export function CartPanel({ cart, removeFromCart, showPopup, setShowCartPanel, setShowConfetti, setConfettiOrigin, navigate }) {
  return (
    <div className="favorites-panel-win2k">
      <div className="favorites-panel-titlebar">
        <span>Cart</span>
        <button className="favorites-panel-close" onClick={() => setShowCartPanel(false)}>&times;</button>
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
                <button
                  className="cart-trash-icon"
                  onClick={() => { removeFromCart(item.id); showPopup('Removed from cart.'); }}
                  aria-label="Remove from cart"
                  type="button"
                >
                  🗑️
                </button>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// FavoritesPanel presentational component
export function FavoritesPanel({ wishlist, setShowFavorites }) {
  return (
    <div className="favorites-panel-win2k">
      <div className="favorites-panel-titlebar">
        <span>Favorites</span>
        <button className="favorites-panel-close" onClick={() => setShowFavorites(false)}>&times;</button>
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
}

// ToolsDropdown presentational component
export function ToolsDropdown({ setShowTools }) {
  return (
    <div className="tools-dropdown-win2k">
      <div className="tools-panel-titlebar">
        <span>Tools</span>
        <button className="tools-panel-close" onClick={() => setShowTools(false)}>&times;</button>
      </div>
      <div className="tools-panel-content">
        <div className="tools-panel-item"><span className="tools-panel-icon"><b>💾</b></span> <span><b>Save Outfit</b>: Save the current top & bottom as an outfit to your Favorites.</span></div>
        <div className="tools-panel-item"><span className="tools-panel-icon"><b>🛒</b></span> <span><b>Add to Cart</b>: Add the current top & bottom to your shopping cart.</span></div>
        <div className="tools-panel-item"><span className="tools-panel-icon">＋/－</span> <span><b>Plus/Minus Button</b>: Add or remove the current item (top or bottom) to/from your cart.</span></div>
        <div className="tools-panel-item"><span className="tools-panel-icon">❤️</span> <span><b>Heart/Unheart</b>: Add or remove an item from your Favorites (wishlist).</span></div>
        <div className="tools-panel-item"><span className="tools-panel-icon"><b>★</b></span> <span><b>Favorites</b>: View your saved items and outfits in a retro panel.</span></div>
      </div>
    </div>
  );
}
