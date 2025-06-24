import React from 'react';
import { COLORS } from '../../config/constants';

/**
 * Reusable LoadingSpinner component
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  color = COLORS.charcoal, 
  className = '',
  fullScreen = false 
}) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const spinner = (
    <svg 
      className={`animate-spin ${sizes[size]} ${className}`}
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill={color} 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner; 