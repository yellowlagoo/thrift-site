import React from 'react';
import { COLORS, FONTS, TRANSITIONS } from '../../config/constants';

/**
 * Reusable Button component with multiple variants
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  // Base styles
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium text-center
    transition-all ${TRANSITIONS.normal}
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  // Variant styles
  const variants = {
    primary: `
      bg-charcoal text-white
      hover:opacity-90
      focus:ring-charcoal
    `,
    secondary: `
      bg-white text-charcoal border-2 border-charcoal
      hover:bg-charcoal hover:text-white
      focus:ring-charcoal
    `,
    outline: `
      bg-transparent text-charcoal border border-charcoal
      hover:bg-charcoal hover:text-white
      focus:ring-charcoal
    `,
    ghost: `
      bg-transparent text-charcoal
      hover:bg-gray-100
      focus:ring-gray-300
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus:ring-red-500
    `,
    link: `
      bg-transparent text-charcoal underline
      hover:opacity-80
      focus:ring-charcoal
    `
  };

  // Size styles
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  // Combine styles
  const buttonStyles = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.medium}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const buttonProps = {
    type,
    disabled: disabled || loading,
    onClick: disabled || loading ? undefined : onClick,
    className: buttonStyles,
    style: {
      fontFamily: FONTS.primary,
      backgroundColor: variant === 'primary' ? COLORS.charcoal : undefined,
      borderColor: variant !== 'primary' && variant !== 'ghost' && variant !== 'link' ? COLORS.charcoal : undefined,
      color: variant === 'primary' ? COLORS.white : COLORS.charcoal
    },
    ...props
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      );
    }

    return (
      <>
        {Icon && iconPosition === 'left' && (
          <Icon className="w-4 h-4 mr-2" />
        )}
        {children}
        {Icon && iconPosition === 'right' && (
          <Icon className="w-4 h-4 ml-2" />
        )}
      </>
    );
  };

  return (
    <button {...buttonProps}>
      {renderContent()}
    </button>
  );
};

export default Button; 