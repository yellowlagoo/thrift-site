import React from 'react';
import { COLORS, FONTS } from '../../config/constants';
import { formatPrice, formatProductDetails } from '../../utils/format';

/**
 * Reusable ProductInfo component
 */
const ProductInfo = ({ 
  product, 
  showPrice = true, 
  className = '',
  titleSize = 'xl',
  alignment = 'center'
}) => {
  const titleSizes = {
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={`${alignmentClasses[alignment]} ${className}`}>
      <h3 
        className={`${titleSizes[titleSize]} font-light mb-2`}
        style={{ 
          fontFamily: FONTS.primary,
          color: COLORS.charcoal
        }}
      >
        {product.name}
      </h3>
      
      <p 
        className="text-gray-600 text-sm mb-4"
        style={{ fontFamily: FONTS.primary }}
      >
        {formatProductDetails(product)}
      </p>
      
      {showPrice && (
        <p 
          className="text-lg font-medium"
          style={{ 
            fontFamily: FONTS.primary,
            color: COLORS.charcoal
          }}
        >
          {formatPrice(product.price)}
        </p>
      )}
    </div>
  );
};

export default ProductInfo; 