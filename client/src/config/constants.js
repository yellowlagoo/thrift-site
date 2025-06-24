// App Configuration Constants
export const APP_CONFIG = {
  name: '919',
  tagline: 'Curated second-hand apparel',
  maxWidth: '1620px',
  cartKey: 'cart',
  favoritesKey: 'favoriteItems'
};

// Theme Colors
export const COLORS = {
  charcoal: '#2d2d2d',
  cream: '#faf9f7',
  gray: {
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d1d5db',
    400: '#9ca3af',
    600: '#6b7280',
    700: '#374151',
    800: '#1f2937'
  },
  white: '#ffffff',
  black: '#000000'
};

// Typography
export const FONTS = {
  primary: "'Inter', sans-serif",
  display: "'Playfair Display', serif"
};

// Layout Dimensions
export const LAYOUT = {
  header: {
    paddingX: 'px-16',
    paddingY: 'py-8',
    spacing: 'space-x-12'
  },
  drawer: {
    width: 'w-96',
    contentHeight: 'calc(100vh - 240px)'
  },
  container: {
    maxWidth: 'max-w-7xl',
    padding: 'px-6 lg:px-12 py-12'
  }
};

// Animation Durations
export const TRANSITIONS = {
  fast: 'duration-200',
  normal: 'duration-300',
  slow: 'duration-500'
};

// Z-Index Layers
export const Z_INDEX = {
  backdrop: 'z-40',
  drawer: 'z-50',
  header: 'z-50'
};

// API Configuration
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  endpoints: {
    products: '/api/products',
    auth: '/api/auth',
    orders: '/api/orders'
  }
};

// Navigation Items
export const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/products', label: 'Shop' }
];

export const RIGHT_NAV_ITEMS = [
  { path: '/favorites', label: 'Favorites' },
  { path: '/account', label: 'Account' }
];

// Form Validation
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
  }
};

// Product Categories
export const CATEGORIES = {
  TOPS: 'tops',
  BOTTOMS: 'bottoms',
  DRESSES: 'dresses',
  ACCESSORIES: 'accessories'
};

// Product Conditions
export const CONDITIONS = {
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
  FAIR: 'Fair'
};

// Sizes
export const SIZES = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
  XXL: 'XXL'
};

// Stripe Configuration
export const STRIPE_CONFIG = {
  publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here',
  currency: 'usd',
  successUrl: `${window.location.origin}/checkout/success`,
  cancelUrl: `${window.location.origin}/checkout/cancel`
}; 