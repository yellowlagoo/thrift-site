import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import CartDrawer from './CartDrawer';
import { useCart } from '../hooks/useCart';
import { 
  APP_CONFIG, 
  COLORS, 
  FONTS, 
  LAYOUT, 
  TRANSITIONS,
  NAV_ITEMS,
  RIGHT_NAV_ITEMS 
} from '../config/constants';

/**
 * Navigation link component
 */
const NavLink = ({ to, children, isActive }) => (
  <Link 
    to={to}
    className={`text-sm uppercase tracking-wider transition-colors ${TRANSITIONS.normal} ${
      isActive 
        ? 'font-medium' 
        : 'text-gray-600 hover:text-charcoal'
    }`}
    style={{ 
      fontFamily: FONTS.primary,
      color: isActive ? COLORS.charcoal : undefined
    }}
  >
    {children}
  </Link>
);

/**
 * Logo component
 */
const Logo = () => (
  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Link to="/" className="block">
      <span 
        className="text-7xl font-light transition-all hover:opacity-80"
        style={{ 
          fontFamily: FONTS.display,
          color: COLORS.charcoal,
          letterSpacing: '0.05em'
        }}
      >
        {APP_CONFIG.name}
      </span>
    </Link>
  </div>
);

/**
 * Search toggle button component
 */
const SearchToggle = ({ isExpanded, onToggle }) => (
  <button 
    className={`p-2 rounded-full transition-all ${TRANSITIONS.normal} ${
      isExpanded ? 'bg-gray-100' : 'hover:bg-gray-100'
    }`}
    aria-label="Toggle search"
    onClick={onToggle}
  >
    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </button>
);

/**
 * Cart button component
 */
const CartButton = ({ count, onClick }) => (
  <button
    onClick={onClick}
    className={`text-sm uppercase tracking-wider transition-colors ${TRANSITIONS.normal} text-gray-600 hover:text-charcoal`}
    style={{ fontFamily: FONTS.primary }}
  >
    Cart ({count})
  </button>
);

/**
 * Main Header component
 */
const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
    
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if current path matches nav link
  const isActive = (path) => location.pathname === path;

  // Toggle search
  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  // Open cart drawer
  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  // Close cart drawer
  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <header 
        className={`sticky top-0 bg-white transition-all ${TRANSITIONS.normal} ${
          isScrolled ? 'shadow-md' : 'border-b border-gray-200'
        }`}
        style={{ zIndex: 50 }}
      >
        <div 
          className={`relative flex items-center w-full ${LAYOUT.header.paddingX} ${LAYOUT.header.paddingY} mx-auto`}
          style={{ maxWidth: APP_CONFIG.maxWidth }}
        >
          {/* Left Navigation */}
          <nav className={`flex items-center ${LAYOUT.header.spacing} flex-1`}>
            {NAV_ITEMS.map(({ path, label }) => (
              <NavLink 
                key={path}
                to={path} 
                isActive={isActive(path)}
          >
                {label}
              </NavLink>
            ))}
        </nav>

          {/* Center Logo */}
          <Logo />
          
          {/* Right Navigation */}
          <nav className={`flex items-center ${LAYOUT.header.spacing} flex-1 justify-end`}>
            {/* Search Section */}
            <div className="flex items-center relative w-80 justify-end">
              <SearchBar 
                isExpanded={isSearchExpanded} 
                setIsExpanded={setIsSearchExpanded} 
              />
              <SearchToggle 
                isExpanded={isSearchExpanded}
                onToggle={handleSearchToggle}
              />
          </div>

            {/* Right Navigation Links */}
            {RIGHT_NAV_ITEMS.map(({ path, label }) => (
              <NavLink 
                key={path}
                to={path} 
                isActive={isActive(path)}
          >
                {label}
              </NavLink>
            ))}

            {/* Cart Button */}
            <CartButton 
              count={cartCount}
              onClick={handleCartOpen}
            />
        </nav>
      </div>
    </header>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={handleCartClose} 
      />
    </>
  );
};

export default Header; 