import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { COLORS, FONTS, TRANSITIONS } from '../../config/constants';

/**
 * Reusable ProductNavigation component
 */
const ProductNavigation = ({ 
  title, 
  currentIndex, 
  totalItems, 
  onPrevious, 
  onNext,
  className = '' 
}) => {
  return (
    <div className={`flex justify-between items-center mb-8 ${className}`}>
      <h2 
        className="text-3xl font-light"
        style={{ 
          fontFamily: FONTS.display,
          color: COLORS.charcoal
        }}
      >
        {title}
      </h2>
      <div className="flex items-center space-x-4">
        <button
          onClick={onPrevious}
          className={`p-3 hover:bg-gray-100 rounded-full transition-colors ${TRANSITIONS.normal}`}
          style={{ color: COLORS.charcoal }}
          aria-label={`Previous ${title.toLowerCase()}`}
        >
          <FaChevronLeft className="h-5 w-5" />
        </button>
        <span 
          className="text-sm text-gray-600 font-medium min-w-[60px]"
          style={{ fontFamily: FONTS.primary }}
        >
          {currentIndex + 1} / {totalItems}
        </span>
        <button
          onClick={onNext}
          className={`p-3 hover:bg-gray-100 rounded-full transition-colors ${TRANSITIONS.normal}`}
          style={{ color: COLORS.charcoal }}
          aria-label={`Next ${title.toLowerCase()}`}
        >
          <FaChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductNavigation; 