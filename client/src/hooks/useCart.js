import { useState, useEffect } from 'react';
import { 
  getCartItems, 
  addToCart, 
  removeFromCart, 
  isInCart, 
  getCartCount,
  processCartItems,
  clearCart
} from '../utils/cart';

/**
 * Custom hook for cart management
 * @returns {Object} Cart state and methods
 */
export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart data
  const loadCart = () => {
    try {
      setIsLoading(true);
      const { items, total: cartTotal } = processCartItems();
      setCartItems(items);
      setTotal(cartTotal);
      setCartCount(getCartCount());
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
      setTotal(0);
      setCartCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize cart and listen for updates
  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Cart methods
  const addItem = (itemId) => {
    const success = addToCart(itemId);
    if (success) {
      loadCart(); // Refresh cart data
    }
    return success;
  };

  const removeItem = (itemId) => {
    removeFromCart(itemId);
    loadCart(); // Refresh cart data
  };

  const checkIsInCart = (itemId) => {
    return isInCart(itemId);
  };

  const clear = () => {
    clearCart();
    loadCart(); // Refresh cart data
  };

  const toggleItem = (itemId) => {
    if (checkIsInCart(itemId)) {
      removeItem(itemId);
      return false;
    } else {
      addItem(itemId);
      return true;
    }
  };

  return {
    // State
    cartItems,
    cartCount,
    total,
    isLoading,
    isEmpty: cartItems.length === 0,
    
    // Methods
    addItem,
    removeItem,
    toggleItem,
    clear,
    isInCart: checkIsInCart,
    refresh: loadCart
  };
}; 