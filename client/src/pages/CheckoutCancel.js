import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { COLORS, FONTS, LAYOUT } from '../config/constants';
import Button from '../components/ui/Button';

const CheckoutCancel = () => {
  const navigate = useNavigate();

  const handleBackToCart = () => {
    navigate('/');
    // You might want to trigger cart drawer opening here
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.cream }}>
      <div className={`${LAYOUT.container.maxWidth} mx-auto px-6 lg:px-12`}>
        <div className="max-w-md mx-auto text-center">
          {/* Cancel Icon */}
          <div className="mb-8">
            <FaTimesCircle 
              className="w-20 h-20 mx-auto"
              style={{ color: '#ef4444' }}
            />
          </div>

          {/* Cancel Message */}
          <h1 
            className="text-3xl font-light mb-4"
            style={{ 
              fontFamily: FONTS.display,
              color: COLORS.charcoal
            }}
          >
            Payment Cancelled
          </h1>

          <p 
            className="text-lg mb-8 leading-relaxed"
            style={{ 
              fontFamily: FONTS.primary,
              color: COLORS.gray[600]
            }}
          >
            Your payment was cancelled. Your items are still in your cart and you can complete your purchase anytime.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleBackToCart}
              icon={FaArrowLeft}
              iconPosition="left"
            >
              Back to Cart
            </Button>
            
            <Button
              variant="outline"
              size="large"
              fullWidth
              onClick={handleContinueShopping}
              icon={FaShoppingBag}
              iconPosition="left"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel; 