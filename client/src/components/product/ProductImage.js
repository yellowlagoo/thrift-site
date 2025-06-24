import React from 'react';
import { TRANSITIONS } from '../../config/constants';

/**
 * Reusable ProductImage component
 */
const ProductImage = ({ 
  src, 
  alt, 
  className = '', 
  onClick,
  size = 'large',
  hover = true 
}) => {
  const sizes = {
    small: 'w-16 h-20',
    medium: 'w-20 h-24', 
    large: 'w-80 h-96',
    xl: 'w-96 h-120'
  };

  const baseClasses = `
    object-cover rounded-sm shadow-elegant
    ${sizes[size]}
    ${onClick ? 'cursor-pointer' : ''}
    ${hover ? `transition-transform hover:scale-105 ${TRANSITIONS.normal}` : ''}
    ${className}
  `.trim();

  return (
    <img
      src={src}
      alt={alt}
      className={baseClasses}
      onClick={onClick}
    />
  );
};

export default ProductImage; 