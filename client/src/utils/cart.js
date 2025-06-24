import { APP_CONFIG } from '../config/constants';
import { allProducts } from '../data/mockData';

/**
 * Get cart items from localStorage
 * @returns {Array} Array of cart item IDs
 */
export const getCartItems = () => {
  return JSON.parse(localStorage.getItem(APP_CONFIG.cartKey) || '[]');
};

/**
 * Save cart items to localStorage
 * @param {Array} items - Array of cart item IDs
 */
export const saveCartItems = (items) => {
  localStorage.setItem(APP_CONFIG.cartKey, JSON.stringify(items));
  window.dispatchEvent(new Event('cartUpdated'));
};

/**
 * Add item to cart
 * @param {string} itemId - Product ID to add
 * @returns {boolean} Success status
 */
export const addToCart = (itemId) => {
  const cartItems = getCartItems();
  if (!cartItems.includes(itemId)) {
    cartItems.push(itemId);
    saveCartItems(cartItems);
    return true;
  }
  return false;
};

/**
 * Remove item from cart
 * @param {string} itemId - Product ID to remove
 */
export const removeFromCart = (itemId) => {
  const cartItems = getCartItems();
  const updatedCart = cartItems.filter(id => id !== itemId);
  saveCartItems(updatedCart);
};

/**
 * Check if item is in cart
 * @param {string} itemId - Product ID to check
 * @returns {boolean} Whether item is in cart
 */
export const isInCart = (itemId) => {
  const cartItems = getCartItems();
  return cartItems.includes(itemId);
};

/**
 * Get cart count (counting outfits as 2 items)
 * @returns {number} Total number of items
 */
export const getCartCount = () => {
  const cartItems = getCartItems();
  let count = 0;
  
  cartItems.forEach(item => {
    if (typeof item === 'string' && item.includes('_')) {
      count += 2; // Outfit counts as 2 items
    } else {
      count += 1; // Single item
    }
  });
  
  return count;
};

/**
 * Process cart items with product data
 * @returns {Object} Processed cart data with items and total
 */
export const processCartItems = () => {
  const cartIds = getCartItems();
  
  // Separate outfit and single item IDs
  const outfitIds = cartIds.filter(id => typeof id === 'string' && id.includes('_'));
  const singleIds = cartIds.filter(id => typeof id === 'string' && !id.includes('_'));
  
  // Process single items
  const singleItems = singleIds.map(id => {
    const product = allProducts.find(p => p._id === id);
    return product ? { ...product, type: 'single' } : null;
  }).filter(Boolean);
  
  // Process outfit items
  const outfitItems = outfitIds.map(outfitId => {
    const [topId, bottomId] = outfitId.split('_');
    const top = allProducts.find(p => p._id === topId);
    const bottom = allProducts.find(p => p._id === bottomId);
    
    if (top && bottom) {
      return {
        _id: outfitId,
        type: 'outfit',
        name: `${top.name} + ${bottom.name}`,
        top,
        bottom,
        price: (top.price || 0) + (bottom.price || 0)
      };
    }
    return null;
  }).filter(Boolean);
  
  const allItems = [...singleItems, ...outfitItems];
  const total = allItems.reduce((sum, item) => sum + (item.price || 0), 0);
  
  return { items: allItems, total };
};

/**
 * Clear entire cart
 */
export const clearCart = () => {
  saveCartItems([]);
}; 