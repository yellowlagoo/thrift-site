import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { COLORS, FONTS, LAYOUT } from '../config/constants';
import Button from '../components/ui/Button';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clear } = useCart();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear the cart after successful payment
    if (sessionId) {
      clear();
    }
  }, [sessionId, clear]);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.cream }}>
      <div className={`${LAYOUT.container.maxWidth} mx-auto px-6 lg:px-12`}>
        <div className="max-w-md mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <FaCheckCircle 
              className="w-20 h-20 mx-auto"
              style={{ color: '#22c55e' }}
            />
          </div>

          {/* Success Message */}
          <h1 
            className="text-3xl font-light mb-4"
            style={{ 
              fontFamily: FONTS.display,
              color: COLORS.charcoal
            }}
          >
            Payment Successful!
          </h1>

          <p 
            className="text-lg mb-8 leading-relaxed"
            style={{ 
              fontFamily: FONTS.primary,
              color: COLORS.gray[600]
            }}
          >
            Thank you for your purchase. Your order has been confirmed and you'll receive an email confirmation shortly.
          </p>

          {/* Order Details */}
          {sessionId && (
            <div 
              className="bg-white rounded-lg p-6 mb-8 border"
              style={{ borderColor: COLORS.gray[200] }}
            >
              <h3 
                className="text-sm font-medium mb-2"
                style={{ 
                  fontFamily: FONTS.primary,
                  color: COLORS.charcoal
                }}
              >
                Order Reference
              </h3>
              <p 
                className="text-xs font-mono bg-gray-50 p-2 rounded"
                style={{ color: COLORS.gray[600] }}
              >
                {sessionId}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={handleContinueShopping}
              icon={FaShoppingBag}
              iconPosition="left"
            >
              Continue Shopping
            </Button>
            
            <Button
              variant="outline"
              size="large"
              fullWidth
              onClick={handleGoHome}
              icon={FaHome}
              iconPosition="left"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess; 