import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../../data/mockData';
import { useCart } from '../../hooks';
import { formatPrice } from '../../utils';
import { COLORS, FONTS } from '../../config/constants';

/**
 * Product stack component for dollar rack
 */
const ProductStack = ({ products, baseImage, title, isActive, onToggle }) => (
  <div 
    className="relative group cursor-pointer transform transition-all duration-500 hover:translate-y-[-5px]" 
    onClick={onToggle}
  >
    <div className="relative w-[450px] h-[450px]">
      {/* Base image */}
      {baseImage && (
        <div className={`absolute ${title === 'Tops' ? 'left-0' : 'right-0'} bottom-0 w-[350px] h-[350px] transform ${title === 'Tops' ? '-rotate-12' : 'rotate-12'} z-10 overflow-hidden rounded-sm`}>
          <img 
            src={baseImage} 
            alt={`Base ${title.toLowerCase()}`} 
            className="w-full h-full object-cover object-center border-2 border-white shadow-xl transition-all duration-500 group-hover:brightness-90"
          />
        </div>
      )}
      
      {/* Stacked products */}
      {products.map((product, index) => (
        <div 
          key={product._id}
          className="absolute transition-all duration-500"
          style={{
            [title === 'Tops' ? 'left' : 'right']: `${30 + (index * 30)}px`,
            top: `${20 + (index * 25)}px`,
            zIndex: 20 + index,
            transform: `rotate(${title === 'Tops' ? -8 + (index * 5) : 8 - (index * 5)}deg)`,
            width: '350px',
            height: '350px'
          }}
        >
          <img 
            src={product.images?.[0]} 
            alt={product.name} 
            className="w-full h-full object-cover object-center border-2 border-white shadow-xl transition-all duration-500 group-hover:brightness-90"
          />
        </div>
      ))}
      
      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50">
        <span 
          className="text-white text-2xl font-light bg-black bg-opacity-50 px-8 py-4 tracking-wide" 
          style={{ 
            fontFamily: FONTS.primary,
            backdropFilter: 'blur(4px)'
          }}
        >
          Browse {title}
        </span>
      </div>
    </div>
  </div>
);

/**
 * Product grid component for expanded view
 */
const ProductGrid = ({ products, title, onProductClick, onAddToCart }) => (
  <div className="mt-16 animate-fade-in">
    <h3 
      className="text-3xl font-light text-center mb-8"
      style={{ 
        fontFamily: FONTS.display,
        color: COLORS.charcoal
      }}
    >
      $1 {title}
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="group bg-white rounded-sm shadow-elegant hover:shadow-elegant-lg transition-all duration-300">
          <div className="relative overflow-hidden aspect-square">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
              onClick={() => onProductClick(product._id)}
            />
          </div>
          <div className="p-4">
            <h4 
              className="text-sm font-light mb-2 cursor-pointer hover:opacity-80"
              style={{ 
                fontFamily: FONTS.primary,
                color: COLORS.charcoal
              }}
              onClick={() => onProductClick(product._id)}
            >
              {product.name}
            </h4>
            <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: FONTS.primary }}>
              {product.brand} • {product.size}
            </p>
            <div className="flex items-center justify-between">
              <span 
                className="text-lg font-medium"
                style={{ 
                  fontFamily: FONTS.primary,
                  color: COLORS.charcoal
                }}
              >
                {formatPrice(product.price)}
              </span>
              <button
                onClick={() => onAddToCart(product)}
                className="px-3 py-1 text-xs bg-charcoal text-white hover:opacity-90 transition-opacity duration-300"
                style={{ 
                  fontFamily: FONTS.primary,
                  backgroundColor: COLORS.charcoal
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Main Dollar Rack Section component
 */
const DollarRackSection = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [showTops, setShowTops] = useState(false);
  const [showBottoms, setShowBottoms] = useState(false);
  const [randomBottomImage, setRandomBottomImage] = useState('');
  const [randomTopImage, setRandomTopImage] = useState('');

  // Filter products
  const dollarItems = allProducts.filter(product => product.price === 1.00);
  const nonDollarItems = allProducts.filter(product => product.price !== 1.00);
  
  const dollarTops = dollarItems.filter(item => item._id.startsWith('top'));
  const dollarBottoms = dollarItems.filter(item => item._id.startsWith('bottom'));
  
  const nonDollarTops = nonDollarItems.filter(item => item._id.startsWith('top'));
  const nonDollarBottoms = nonDollarItems.filter(item => item._id.startsWith('bottom'));

  // Set random images on mount
  useEffect(() => {
    if (nonDollarTops.length > 0) {
      const randomTopIndex = Math.floor(Math.random() * nonDollarTops.length);
      setRandomTopImage(nonDollarTops[randomTopIndex].images?.[0]);
    }
    
    if (nonDollarBottoms.length > 0) {
      const randomBottomIndex = Math.floor(Math.random() * nonDollarBottoms.length);
      setRandomBottomImage(nonDollarBottoms[randomBottomIndex].images?.[0]);
    }
  }, [nonDollarTops, nonDollarBottoms]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (product) => {
    addItem(product._id);
    alert(`${product.name} added to cart!`);
  };

  const handleToggleTops = () => {
    setShowTops(!showTops);
    setShowBottoms(false);
  };

  const handleToggleBottoms = () => {
    setShowBottoms(!showBottoms);
    setShowTops(false);
  };

  return (
    <div className="w-full px-6 sm:px-8 lg:px-12 mb-24 max-w-7xl mx-auto">
      {/* Main rack display */}
      <div className="flex flex-col items-center mb-16">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 w-full mt-8">
          {/* Left side - Tops */}
          <ProductStack
            products={dollarTops}
            baseImage={randomTopImage}
            title="Tops"
            isActive={showTops}
            onToggle={handleToggleTops}
          />
          
          {/* Center text */}
          <div className="flex items-center px-6 py-8">
            <div className="text-center">
              <div 
                className="text-8xl font-light mb-2" 
                style={{ 
                  fontFamily: FONTS.display,
                  color: COLORS.charcoal
                }}
              >
                $1
              </div>
              <div 
                className="text-2xl font-light tracking-widest uppercase text-gray-600" 
                style={{ 
                  fontFamily: FONTS.primary,
                  letterSpacing: '0.2em'
                }}
              >
                Rack
              </div>
            </div>
          </div>
          
          {/* Right side - Bottoms */}
          <ProductStack
            products={dollarBottoms}
            baseImage={randomBottomImage}
            title="Bottoms"
            isActive={showBottoms}
            onToggle={handleToggleBottoms}
          />
        </div>
      </div>

      {/* Expanded product grids */}
      {showTops && (
        <ProductGrid
          products={dollarTops}
          title="Tops"
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
        />
      )}

      {showBottoms && (
        <ProductGrid
          products={dollarBottoms}
          title="Bottoms"
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default DollarRackSection; 