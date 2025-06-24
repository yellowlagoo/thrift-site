import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaTimes } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { formatPrice, formatItemCount } from '../utils/format';
import { createCartCheckoutSession, redirectToCheckout } from '../utils/stripe';
import { COLORS, FONTS, LAYOUT, TRANSITIONS, Z_INDEX } from '../config/constants';
import Button from './ui/Button';
import EmptyState from './ui/EmptyState';
import LoadingSpinner from './ui/LoadingSpinner';

/**
 * Cart item component for single items
 */
const CartItemSingle = ({ item, onRemove, onNavigate }) => (
  <div className="flex space-x-4 pb-6 border-b border-gray-100 last:border-b-0">
    <img
      src={item.images?.[0]}
      alt={item.name}
      className="w-20 h-24 object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
      onClick={() => onNavigate(item._id)}
    />
    <div className="flex-1 min-w-0">
      <h3 
        className="text-sm font-medium mb-1 cursor-pointer hover:opacity-80"
        style={{ fontFamily: FONTS.primary, color: COLORS.charcoal }}
        onClick={() => onNavigate(item._id)}
      >
        {item.name}
      </h3>
      <p className="text-xs text-gray-600 mb-2" style={{ fontFamily: FONTS.primary }}>
        {item.brand} • {item.size} • {item.condition}
      </p>
      <div className="flex items-center justify-between">
        <span 
          className="text-sm font-medium"
          style={{ fontFamily: FONTS.primary, color: COLORS.charcoal }}
        >
          {formatPrice(item.price)}
        </span>
        <button
          onClick={() => onRemove(item._id)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          style={{ color: COLORS.gray[600] }}
        >
          <FaTrash className="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
);

/**
 * Cart item component for outfits
 */
const CartItemOutfit = ({ item, onRemove, onNavigate }) => (
  <div className="flex space-x-4 pb-6 border-b border-gray-100 last:border-b-0">
    <div className="flex space-x-2">
      <img
        src={item.top.images?.[0]}
        alt={item.top.name}
        className="w-16 h-20 object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => onNavigate(item.top._id)}
      />
      <img
        src={item.bottom.images?.[0]}
        alt={item.bottom.name}
        className="w-16 h-20 object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => onNavigate(item.bottom._id)}
      />
    </div>
    <div className="flex-1 min-w-0">
      <h3 
        className="text-sm font-medium mb-1"
        style={{ fontFamily: FONTS.primary, color: COLORS.charcoal }}
      >
        Complete Outfit
      </h3>
      <p className="text-xs text-gray-600 mb-2" style={{ fontFamily: FONTS.primary }}>
        {item.top.name} + {item.bottom.name}
      </p>
      <div className="flex items-center justify-between">
        <span 
          className="text-sm font-medium"
          style={{ fontFamily: FONTS.primary, color: COLORS.charcoal }}
        >
          {formatPrice(item.price)}
        </span>
        <button
          onClick={() => onRemove(item._id)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          style={{ color: COLORS.gray[600] }}
        >
          <FaTrash className="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
);

/**
 * Cart drawer header component
 */
const CartHeader = ({ itemCount, onClose }) => (
  <div className="flex items-center justify-between p-6 border-b border-gray-200">
    <h2 
      className="text-xl font-medium uppercase tracking-wider"
      style={{ 
        fontFamily: FONTS.primary,
        color: COLORS.charcoal
      }}
    >
      Your Bag: {formatItemCount(itemCount)}
    </h2>
    <button
      onClick={onClose}
      className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${TRANSITIONS.fast}`}
      style={{ color: COLORS.charcoal }}
    >
      <FaTimes className="w-5 h-5" />
    </button>
  </div>
);

/**
 * Main CartDrawer component
 */
const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, total, isLoading, isEmpty, removeItem } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleNavigateToProduct = (productId) => {
    navigate(`/products/${productId}`);
    onClose();
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const session = await createCartCheckoutSession(cartItems);
      await redirectToCheckout(session.id);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStartShopping = () => {
    navigate('/products');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${TRANSITIONS.normal} ${Z_INDEX.backdrop}`}
          onClick={handleBackdropClick}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full ${LAYOUT.drawer.width} bg-white shadow-2xl transform transition-transform ${TRANSITIONS.normal} ease-in-out ${Z_INDEX.drawer} ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <CartHeader itemCount={cartItems.length} onClose={onClose} />

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto" style={{ height: LAYOUT.drawer.contentHeight }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner size="large" />
            </div>
          ) : isEmpty ? (
            <EmptyState
              title="Your bag is empty"
              description="Add some items to get started"
              actionLabel="Start Shopping"
              onAction={handleStartShopping}
              className="h-full"
            />
          ) : (
            <div className="p-6 space-y-6">
              {cartItems.map((item) => (
                item.type === 'outfit' ? (
                  <CartItemOutfit
                    key={item._id}
                    item={item}
                    onRemove={removeItem}
                    onNavigate={handleNavigateToProduct}
                  />
                ) : (
                  <CartItemSingle
                    key={item._id}
                    item={item}
                    onRemove={removeItem}
                    onNavigate={handleNavigateToProduct}
                  />
                )
              ))}
            </div>
          )}
        </div>

        {/* Checkout Footer */}
        {!isEmpty && !isLoading && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span 
                className="text-lg font-medium"
                style={{ fontFamily: FONTS.primary, color: COLORS.charcoal }}
              >
                Total: {formatPrice(total)}
              </span>
            </div>
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleCheckout}
              disabled={isCheckingOut}
              loading={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer; 