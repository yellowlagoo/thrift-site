import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { FONTS } from '../config/constants';

const ProductCard = ({ product, onClick }) => {
  if (!product) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {/* Product Image */}
      <div className="relative" onClick={onClick}>
        <img 
          src={product.images && product.images[0]} 
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4" onClick={onClick}>
        {/* Product name with shopping bag icon */}
        <div className="flex items-center mb-2">
          <FaShoppingBag className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
          <h3 
            className="font-medium text-lg truncate"
            style={{ fontFamily: FONTS.primary }}
          >
            {product.name}
          </h3>
        </div>
        
        <p 
          className="text-gray-600 text-sm mb-3 line-clamp-2"
          style={{ fontFamily: FONTS.primary }}
        >
          {product.description}
        </p>
        
        {/* Price and details */}
        <div className="flex justify-between items-center mb-3">
          <span 
            className="text-lg font-medium text-gray-900"
            style={{ fontFamily: FONTS.primary }}
          >
            ${product.price}
          </span>
          <span 
            className="text-sm text-gray-500"
            style={{ fontFamily: FONTS.primary }}
          >
            {product.condition}
          </span>
        </div>
        
        {/* Brand and size tags */}
        <div className="flex space-x-2">
          <span 
            className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700"
            style={{ fontFamily: FONTS.primary }}
          >
            {product.brand}
          </span>
          <span 
            className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700"
            style={{ fontFamily: FONTS.primary }}
          >
            {product.size}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 