import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { COLORS, FONTS, TRANSITIONS } from '../../config/constants';
import Button from '../ui/Button';

/**
 * Individual product action buttons component
 */
const ProductItemActions = ({ 
  product, 
  isInCart, 
  onToggleCart 
}) => (
  <div className="flex justify-center w-full">
    <button
      onClick={() => onToggleCart(product._id)}
      className="p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
      style={{
        backgroundColor: isInCart ? '#dc2626' : '#6b7280', // red when in cart, gray when not
        color: '#ffffff'
      }}
      title={isInCart ? 'Remove from cart' : 'Add to cart'}
    >
      <FaShoppingCart className="w-5 h-5" />
    </button>
  </div>
);

/**
 * Outfit action buttons component
 */
const OutfitActions = ({ 
  isOutfitInFavorites, 
  isOutfitInCart, 
  onToggleOutfitFavorite, 
  onAddOutfitToCart,
  className = '' 
}) => (
  <div className={`flex items-center justify-center space-x-6 ${className}`}>
    <Button
      variant="ghost"
      size="medium"
      onClick={onToggleOutfitFavorite}
      icon={isOutfitInFavorites ? FaMinus : FaPlus}
      iconPosition="left"
      className="px-8 py-3 font-light tracking-wide"
      style={{
        fontFamily: FONTS.primary,
        color: COLORS.charcoal,
        borderColor: COLORS.charcoal
      }}
    >
      {isOutfitInFavorites ? 'Remove from Favorites' : 'Save to Favorites'}
    </Button>
    
    <div className="w-px h-8 bg-gray-300"></div>
    
    <Button
      variant="outline"
      size="medium"
      onClick={onAddOutfitToCart}
      disabled={isOutfitInCart}
      icon={FaShoppingBag}
      iconPosition="left"
      className="px-8 py-3 font-light tracking-wide"
      style={{
        fontFamily: FONTS.primary,
        backgroundColor: isOutfitInCart ? COLORS.gray[100] : COLORS.white,
        borderColor: COLORS.charcoal,
        color: isOutfitInCart ? COLORS.gray[400] : COLORS.charcoal
      }}
    >
      {isOutfitInCart ? 'In Cart' : 'Add to Cart'}
    </Button>
  </div>
);

/**
 * Main ProductActions component
 */
const ProductActions = {
  Item: ProductItemActions,
  Outfit: OutfitActions
};

export default ProductActions; 