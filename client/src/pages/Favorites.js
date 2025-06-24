import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaTrash, FaHeart } from 'react-icons/fa';
import { getProductById } from '../data/mockData';
import { useCart, useFavorites } from '../hooks';
import { formatPrice, formatProductDetails } from '../utils';
import { COLORS, FONTS, LAYOUT } from '../config/constants';
import { Button, EmptyState } from '../components/ui';
import { ProductImage } from '../components/product';

/**
 * Individual favorite item card component
 */
const FavoriteItemCard = ({ 
  item, 
  onRemove, 
  onAddToCart, 
  onNavigate, 
  isInCart 
}) => (
  <div className="group bg-white rounded-sm shadow-elegant hover:shadow-elegant-lg transition-shadow duration-300">
    {/* Product Image */}
    <div className="relative overflow-hidden aspect-square">
      <ProductImage
        src={item.images?.[0]}
        alt={item.name}
        className="w-full h-full cursor-pointer transition-transform duration-500 group-hover:scale-105"
        onClick={() => onNavigate(item._id)}
        hover={false}
      />
      
      {/* Overlay with remove button */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-end p-4">
        <button
          onClick={() => onRemove(item._id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
          title="Remove from favorites"
        >
          <FaTrash className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>

    {/* Product Info */}
    <div className="p-6">
      <h3 
        className="text-lg font-light mb-3"
        style={{ 
          fontFamily: FONTS.primary,
          color: COLORS.charcoal
        }}
      >
        {item.name}
      </h3>
      
      <p 
        className="text-gray-600 text-sm mb-4"
        style={{ fontFamily: FONTS.primary }}
      >
        {formatProductDetails(item)}
      </p>

      <p 
        className="text-lg font-medium mb-4"
        style={{ 
          fontFamily: FONTS.primary,
          color: COLORS.charcoal
        }}
      >
        {formatPrice(item.price)}
      </p>

      {/* Action buttons */}
      <div className="flex space-x-2">
        <Button
          variant={isInCart ? "secondary" : "primary"}
          size="medium"
          fullWidth
          onClick={() => onAddToCart(item)}
          icon={FaShoppingBag}
          iconPosition="left"
          className="text-sm"
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  </div>
);

/**
 * Favorites page header component
 */
const FavoritesHeader = ({ itemCount }) => (
  <div className="text-center mb-12">
    <h1 
      className="text-5xl font-light mb-6"
      style={{ 
        fontFamily: FONTS.display,
        color: COLORS.charcoal,
        letterSpacing: '0.02em'
      }}
    >
      Your Favorites
    </h1>
    <p 
      className="text-lg text-gray-600 max-w-2xl mx-auto"
      style={{ 
        fontFamily: FONTS.primary,
        lineHeight: '1.6'
      }}
    >
      {itemCount === 0 
        ? "Start building your collection of favorite pieces"
        : `${itemCount} carefully curated item${itemCount === 1 ? '' : 's'} in your collection`
      }
    </p>
  </div>
);

/**
 * Main Favorites page component
 */
const Favorites = () => {
  const navigate = useNavigate();
  const { isInCart, toggleItem: toggleCartItem } = useCart();
  const { favoriteItems, removeItem: removeFromFavorites } = useFavorites();

  // Get full product data for favorite items
  const favoriteProducts = favoriteItems
    .map(id => getProductById(id))
    .filter(Boolean);

  const handleNavigateToProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (item) => {
    if (isInCart(item._id)) {
      // Remove from cart if already in cart
      toggleCartItem(item._id);
    } else {
      // Add to cart
      toggleCartItem(item._id);
      // Note: You might want to show a success message here
    }
  };

  const handleRemoveFromFavorites = (itemId) => {
    removeFromFavorites(itemId);
  };

  const handleStartShopping = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.cream }}>
      <div className={`${LAYOUT.container.maxWidth} mx-auto ${LAYOUT.container.padding}`}>
        <FavoritesHeader itemCount={favoriteProducts.length} />

        {favoriteProducts.length === 0 ? (
          <EmptyState
            icon={FaHeart}
            title="No favorites yet"
            description="Browse our collection and add pieces that speak to you."
            actionLabel="Start Shopping"
            onAction={handleStartShopping}
            className="py-16"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favoriteProducts.map(item => (
              <FavoriteItemCard
                key={item._id}
                item={item}
                onRemove={handleRemoveFromFavorites}
                onAddToCart={handleAddToCart}
                onNavigate={handleNavigateToProduct}
                isInCart={isInCart(item._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 