import React from 'react';
import { useCart } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './CartCard.css';

// Assign price based on type
const getPrice = (type) => (type === 'shirt' ? 5 : 7);

const CartCard = () => {
  const { cart: cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + getPrice(item.type), 0);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-CA');
  const timeStr = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (cartItems.length === 0) {
    return (
      <div className="receipt-bg">
        <div className="receipt-paper">
          <div className="receipt-title">SHOPPING RECEIPT</div>
          <div className="receipt-dashed" />
          <div className="receipt-list">
            <div className="receipt-item-row">
              <div className="receipt-item-name">Cart is empty</div>
            </div>
          </div>
          <div className="receipt-dashed" />
          <div className="receipt-footer-row">
            <span>{dateStr}</span>
            <span>ORDER#901</span>
          </div>
          <div className="receipt-barcode">
          <img src="https://scannables.scdn.co/uri/plain/jpeg/FFFFFF/black/320/spotify:album:20L7jioy07nNhn7G7N1rbO" alt="Spotify Code" className="receipt-barcode-img" />
          </div>
          <div className="receipt-footer-brand">
            <img src="https://i.pinimg.com/736x/6a/a4/e2/6aa4e20f05897a2bf7b139ffdbfaf756.jpg" alt="Brand Logo" className="receipt-footer-logo" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="receipt-bg">
      <div className="receipt-paper">
        <div className="receipt-title">SHOPPING RECEIPT</div>
        <div className="receipt-dashed" />
        <div className="receipt-list">
          {cartItems.map((item, idx) => (
            <div className="receipt-item-row" key={idx}>
              <div className="receipt-item-num">{String(idx + 1).padStart(2, '0')}</div>
              <div className="receipt-item-main">
                <div className="receipt-item-name">{item.name}</div>
                <img className="receipt-item-img" src={item.img} alt={item.name} />
                <button className="receipt-item-remove" onClick={() => removeFromCart(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <div className="receipt-item-prices">
                <span className="receipt-item-price">${getPrice(item.type)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="receipt-dashed" />
        <div className="receipt-summary">
          <div className="receipt-summary-row">
            <span>SUBTOTAL</span>
            <span>${subtotal}</span>
          </div>
          <div className="receipt-summary-row total">
            <span>Shipping calculated at checkout</span>
          </div>
        </div>
        <div className="receipt-dashed" />
        <div className="receipt-footer-row">
          <span>{dateStr}</span>
          <span>ORDER#901</span>
        </div>
        <div className="receipt-barcode">
          <img src="https://scannables.scdn.co/uri/plain/jpeg/FFFFFF/black/320/spotify:album:20L7jioy07nNhn7G7N1rbO" alt="Spotify Code" className="receipt-barcode-img" />
        </div>
        <div className="receipt-footer-brand">
          <img src="https://i.pinimg.com/736x/6a/a4/e2/6aa4e20f05897a2bf7b139ffdbfaf756.jpg" alt="Brand Logo" className="receipt-footer-logo" />
        </div>
      </div>
    </div>
  );
};

export default CartCard; 