import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tops, bottoms } from '../data/mockData';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { COLORS, LAYOUT } from '../config/constants';
import ProductNavigation from '../components/product/ProductNavigation';
import ProductImage from '../components/product/ProductImage';
import ProductInfo from '../components/product/ProductInfo';
import ProductActions from '../components/product/ProductActions';

/**
 * Individual product panel component
 */
const ProductPanel = ({ 
  title, 
  products, 
  currentIndex, 
  onPrevious, 
  onNext, 
  onProductClick,
  onToggleCart,
  isInCart
}) => {
  const currentProduct = products[currentIndex];

  return (
    <div className="text-center">
      <ProductNavigation
        title={title}
        currentIndex={currentIndex}
        totalItems={products.length}
        onPrevious={onPrevious}
        onNext={onNext}
      />

      <div className="flex flex-col items-center mb-8">
        <div className="mb-6">
          <ProductImage
            src={currentProduct.images?.[0]}
            alt={currentProduct.name}
            onClick={() => onProductClick(currentProduct._id)}
            size="large"
          />
        </div>
        
        <div className="max-w-sm">
          <ProductInfo 
            product={currentProduct}
            showPrice={true}
            className="mb-6"
          />
          
          <ProductActions.Item
            product={currentProduct}
            isInCart={isInCart(currentProduct._id)}
            onToggleCart={onToggleCart}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Main Products page component
 */
const Products = () => {
  const navigate = useNavigate();
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  
  const { isInCart, toggleItem: toggleCart } = useCart();
  const { 
    isInFavorites, 
    toggleItem: toggleFavorite,
    isOutfitInFavorites,
    toggleOutfit: toggleOutfitFavorite
  } = useFavorites();

  const currentTop = tops[topIndex];
  const currentBottom = bottoms[bottomIndex];

  // Navigation handlers
  const handlePrevTop = () => setTopIndex((topIndex - 1 + tops.length) % tops.length);
  const handleNextTop = () => setTopIndex((topIndex + 1) % tops.length);
  const handlePrevBottom = () => setBottomIndex((bottomIndex - 1 + bottoms.length) % bottoms.length);
  const handleNextBottom = () => setBottomIndex((bottomIndex + 1) % bottoms.length);

  // Product interaction handlers
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleToggleCart = (itemId) => {
    const wasInCart = isInCart(itemId);
    toggleCart(itemId);
    
    // Optional: Show feedback (you can remove this if you don't want alerts)
    if (wasInCart) {
      console.log('Item removed from cart');
    } else {
      console.log('Item added to cart');
    }
  };

  const handleToggleOutfitFavorite = () => {
    const isCurrentlyFavorite = isOutfitInFavorites(currentTop._id, currentBottom._id);
    toggleOutfitFavorite(currentTop._id, currentBottom._id);
    
    if (isCurrentlyFavorite) {
      alert('Outfit removed from favorites!');
    } else {
      alert('Outfit saved to favorites!');
    }
  };

  const handleAddOutfitToCart = () => {
    const outfitId = `${currentTop._id}_${currentBottom._id}`;
    
    if (isInCart(outfitId)) {
      alert('This outfit is already in your cart!');
      return;
    }
    
    addToCart(outfitId);
    alert('Complete outfit added to cart!');
  };

  const isOutfitInCart = () => {
    const outfitId = `${currentTop._id}_${currentBottom._id}`;
    return isInCart(outfitId);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.cream }}>
      <div className={`${LAYOUT.container.maxWidth} mx-auto ${LAYOUT.container.padding}`}>
        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Left Panel - Tops */}
          <ProductPanel
            title="Tops"
            products={tops}
            currentIndex={topIndex}
            onPrevious={handlePrevTop}
            onNext={handleNextTop}
            onProductClick={handleProductClick}
            onToggleCart={handleToggleCart}
            isInCart={isInCart}
          />

          {/* Right Panel - Bottoms */}
          <ProductPanel
            title="Bottoms"
            products={bottoms}
            currentIndex={bottomIndex}
            onPrevious={handlePrevBottom}
            onNext={handleNextBottom}
            onProductClick={handleProductClick}
            onToggleCart={handleToggleCart}
            isInCart={isInCart}
          />
        </div>

        {/* Outfit Actions */}
        <ProductActions.Outfit
          isOutfitInFavorites={isOutfitInFavorites(currentTop._id, currentBottom._id)}
          isOutfitInCart={isOutfitInCart()}
          onToggleOutfitFavorite={handleToggleOutfitFavorite}
          onAddOutfitToCart={handleAddOutfitToCart}
          className="mb-16"
        />
      </div>
    </div>
  );
};

export default Products; 