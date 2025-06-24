import React from 'react';
import { COLORS, FONTS } from '../../config/constants';
import Button from './Button';

/**
 * Reusable EmptyState component
 */
const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 ${className}`}>
      {Icon && (
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: COLORS.gray[100] }}
        >
          <Icon className="w-8 h-8" style={{ color: COLORS.gray[400] }} />
        </div>
      )}
      
      {title && (
        <h3 
          className="text-lg font-light mb-2"
          style={{ 
            fontFamily: FONTS.primary,
            color: COLORS.charcoal
          }}
        >
          {title}
        </h3>
      )}
      
      {description && (
        <p 
          className="text-sm mb-6 max-w-sm"
          style={{ 
            fontFamily: FONTS.primary,
            color: COLORS.gray[600]
          }}
        >
          {description}
        </p>
      )}
      
      {actionLabel && onAction && (
        <Button
          variant="primary"
          size="medium"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState; 