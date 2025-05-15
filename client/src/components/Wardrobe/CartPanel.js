import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext';

export function CartPanel({
  showPopup,
  setShowCartPanel,
  setShowConfetti,
  setConfettiOrigin
}) {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-panel">
      <div className="panel-header">
        <span>Cart</span>
        <button className="close-btn" onClick={() => setShowCartPanel(false)}>&times;</button>
      </div>
      <div className="panel-content">
        {cartItems.length === 0 ? (
          <div className="empty-message">Your cart is empty.</div>
        ) : (
          cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="item-image" />
              <span className="item-name">{item.name}</span>
              <button 
                className="remove-btn"
                onClick={() => { removeFromCart(item.id); showPopup('Removed from cart.'); }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <button 
          className="checkout-btn"
          onClick={e => {
            const rect = e.target.getBoundingClientRect();
            setConfettiOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            setShowConfetti(true);
            showPopup('Checkout started!');
            setTimeout(() => { setShowConfetti(false); window.location.href = '/checkout'; }, 1200);
          }}
        >
          Checkout
        </button>
      )}
    </div>
  );
} 