import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faUser, 
  faHeart, 
  faRobot, 
  faSearch, 
  faTshirt,
  faXmark,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useCart } from '../Cart/CartContext';
import { useWishlist } from '../Wishlist/WishlistContext';

const Header = () => {
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  
  const toggleAiHelper = () => {
    setShowAiHelper(!showAiHelper);
  };
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  const wishlistColor = wishlist.length > 0 ? 'var(--color-accent)' : 'var(--color-text-primary)';
  const cartColor = cart.length > 0 ? 'var(--color-accent)' : 'var(--color-text-primary)';
  
  return (
    <header className="header-swiss">
      <div className="container">
        <div className="logo">
          <Link to="/">901</Link>
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', display: 'none' }}
        >
          <FontAwesomeIcon icon={showMobileMenu ? faXmark : faBars} />
        </button>
        
        {/* Main Navigation */}
        <nav className={`main-nav ${showMobileMenu ? 'active' : ''}`}>
          <Link to="/" onClick={() => setShowMobileMenu(false)}>Home</Link>
          <Link to="/outfit-builder" onClick={() => setShowMobileMenu(false)}>Outfit Builder</Link>
          <Link to="/about" onClick={() => setShowMobileMenu(false)}>About</Link>
        </nav>
        
        {/* User Navigation */}
        <div className="user-nav" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="search-box" style={{ position: 'relative', marginRight: '1rem' }}>
            <input 
              type="text" 
              placeholder="SEARCH" 
              style={{ 
                border: 'none', 
                borderBottom: '1px solid var(--color-text-primary)', 
                padding: '0.5rem 0',
                outline: 'none',
                width: '120px',
                background: 'transparent',
                fontSize: 'var(--font-sm)',
                textTransform: 'uppercase'
              }} 
            />
            <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          
          <Link to="/wishlist" title="Wishlist" style={{ color: wishlistColor }}>
            <FontAwesomeIcon icon={faHeart} />
          </Link>
          
          <Link to="/cart" title="Cart" style={{ color: cartColor, position: 'relative' }}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cart.length > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-8px', 
                right: '-8px', 
                background: 'var(--color-accent)', 
                color: 'white', 
                width: '16px', 
                height: '16px',
                borderRadius: '50%',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>{cart.length}</span>
            )}
          </Link>
          
          <Link to="/account" title="Account" style={{ color: 'var(--color-text-primary)' }}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>
      
      {/* AI Helper Dropdown - styled with Swiss design */}
      {showAiHelper && (
        <div 
          style={{
            position: 'absolute',
            top: '80px',
            right: '0',
            width: '300px',
            backgroundColor: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border)',
            zIndex: '100',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, fontSize: 'var(--font-sm)', textTransform: 'uppercase' }}>Style Assistant</h4>
            <button 
              onClick={toggleAiHelper}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          
          <div style={{ padding: '1rem' }}>
            <p style={{ marginBottom: '1rem', fontSize: 'var(--font-sm)' }}>What would you like to do today?</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className="btn-swiss" style={{ marginBottom: '0.5rem' }}>
                FIND MY STYLE
              </button>
              
              <button className="btn-swiss btn-swiss-outline">
                STYLE QUIZ
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
