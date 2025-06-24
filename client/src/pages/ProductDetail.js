import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingBag, FaPlus, FaChevronLeft, FaChevronRight, FaMinus } from 'react-icons/fa';
import { getProductById } from '../data/mockData';
import { useCart, useFavorites } from '../hooks';
import { formatPrice } from '../utils';
import { COLORS, FONTS, LAYOUT } from '../config/constants';
import { Button, LoadingSpinner } from '../components/ui';

/**
 * Product image gallery component
 */
const ProductImageGallery = ({ images, productName, currentIndex, onIndexChange }) => {
  const nextImage = () => {
    onIndexChange((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="relative">
        <img
          src={images[currentIndex]}
          alt={productName}
          className="w-full h-[600px] object-cover rounded-sm shadow-elegant"
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-elegant transition-all duration-300"
              style={{ color: COLORS.charcoal }}
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-elegant transition-all duration-300"
              style={{ color: COLORS.charcoal }}
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? 'border-charcoal shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ 
                borderColor: index === currentIndex ? COLORS.charcoal : undefined
              }}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Product information component
 */
const ProductInfo = ({ product, isInFavorites, isInCart, onToggleFavorite, onToggleCart }) => (
  <div className="space-y-8">
    <div>
      <h1 
        className="text-4xl font-light mb-4"
        style={{ 
          fontFamily: FONTS.display,
          color: COLORS.charcoal
        }}
      >
        {product.name}
      </h1>
      
      <div className="flex items-center space-x-4 mb-6">
        <span 
          className="text-2xl font-light"
          style={{ 
            fontFamily: FONTS.primary,
            color: COLORS.charcoal
          }}
        >
          {formatPrice(product.price)}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <span 
            className="text-sm font-medium text-gray-700 w-20"
            style={{ fontFamily: FONTS.primary }}
          >
            Brand:
          </span>
          <span 
            className="text-sm"
            style={{ 
              fontFamily: FONTS.primary,
              color: COLORS.charcoal
            }}
          >
            {product.brand}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span 
            className="text-sm font-medium text-gray-700 w-20"
            style={{ fontFamily: FONTS.primary }}
          >
            Size:
          </span>
          <span 
            className="text-sm"
            style={{ 
              fontFamily: FONTS.primary,
              color: COLORS.charcoal
            }}
          >
            {product.size}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span 
            className="text-sm font-medium text-gray-700 w-20"
            style={{ fontFamily: FONTS.primary }}
          >
            Condition:
          </span>
          <span 
            className="text-sm"
            style={{ 
              fontFamily: FONTS.primary,
              color: COLORS.charcoal
            }}
          >
            {product.condition}
          </span>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="space-y-4">
      <Button
        variant={isInCart ? "primary" : "outline"}
        size="large"
        fullWidth
        onClick={onToggleCart}
        icon={FaShoppingBag}
        iconPosition="left"
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </Button>
      
      <Button
        variant="outline"
        size="large"
        fullWidth
        onClick={onToggleFavorite}
        icon={isInFavorites ? FaMinus : FaPlus}
        iconPosition="left"
      >
        {isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </div>

    {/* Product Description */}
    {product.description && (
      <div className="border-t border-gray-200 pt-8">
        <h3 
          className="text-lg font-medium mb-4"
          style={{ 
            fontFamily: FONTS.primary,
            color: COLORS.charcoal
          }}
        >
          Description
        </h3>
        <p 
          className="text-gray-700 leading-relaxed"
          style={{ fontFamily: FONTS.primary }}
        >
          {product.description}
        </p>
      </div>
    )}
  </div>
);

/**
 * Main ProductDetail page component
 */
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const { isInCart, toggleItem: toggleCart } = useCart();
  const { isInFavorites, toggleItem: toggleFavorite } = useFavorites();

  useEffect(() => {
    const foundProduct = getProductById(id);
    setProduct(foundProduct);
    setIsLoading(false);
  }, [id]);

  const handleToggleCart = () => {
    if (product) {
      toggleCart(product._id);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product._id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.cream }}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.cream }}>
        <div 
          className="text-xl font-light"
          style={{ 
            fontFamily: FONTS.primary,
            color: COLORS.charcoal
          }}
        >
          Product not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.cream }}>
      <div className={`${LAYOUT.container.maxWidth} mx-auto px-6 lg:px-12 py-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <ProductImageGallery
            images={product.images}
            productName={product.name}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
          />

          {/* Product Details */}
          <ProductInfo
            product={product}
            isInFavorites={isInFavorites(product._id)}
            isInCart={isInCart(product._id)}
            onToggleFavorite={handleToggleFavorite}
            onToggleCart={handleToggleCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 