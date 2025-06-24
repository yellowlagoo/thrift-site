import React, { useState } from 'react';
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardName: '',
    billingSame: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for order submission
    alert('Order placed!');
  };

  const subtotal = 20.00; // Replace with cart subtotal if available
  const shipping = 5.00;
  const tax = 0.40;
  const total = (subtotal + shipping + tax).toFixed(2);

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="checkout-columns">
          {/* Shipping Address */}
          <div className="checkout-section">
            <h2 className="checkout-section-title">Shipping Address</h2>
                  <input
              className="checkout-input"
                    type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
                    onChange={handleChange}
              autoComplete="name"
            />
                  <input
              className="checkout-input"
                    type="text"
                    name="address"
              placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
              autoComplete="address-line1"
            />
            <input
              className="checkout-input"
              type="text"
              name="address2"
              placeholder="Apartment, suite, etc. (optional)"
              value={formData.address2}
              onChange={handleChange}
              autoComplete="address-line2"
            />
                  <input
              className="checkout-input"
                    type="text"
                    name="city"
              placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
              autoComplete="address-level2"
            />
            <div className="checkout-row">
                  <input
                className="checkout-input checkout-input-half"
                    type="text"
                    name="state"
                placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                autoComplete="address-level1"
              />
                  <input
                className="checkout-input checkout-input-half"
                    type="text"
                name="zip"
                placeholder="Zip Code"
                value={formData.zip}
                    onChange={handleChange}
                autoComplete="postal-code"
                  />
                </div>
            <input
              className="checkout-input"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
                    onChange={handleChange}
              autoComplete="email"
            />
            <div className="checkout-summary">
              <div className="checkout-summary-row">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
                </div>
              </div>
            </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <h2 className="checkout-section-title">Payment Method</h2>
                  <input
              className="checkout-input"
                    type="text"
                    name="cardNumber"
              placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={handleChange}
              autoComplete="cc-number"
            />
            <div className="checkout-row">
              <input
                className="checkout-input checkout-input-half"
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                autoComplete="cc-exp"
              />
              <input
                className="checkout-input checkout-input-half"
                type="text"
                name="cvc"
                placeholder="CVC"
                value={formData.cvc}
                onChange={handleChange}
                autoComplete="cc-csc"
              />
                </div>
                  <input
              className="checkout-input"
                    type="text"
                    name="cardName"
              placeholder="Name on card"
                    value={formData.cardName}
                    onChange={handleChange}
              autoComplete="cc-name"
            />
            <div className="checkout-checkbox-row">
                  <input
                type="checkbox"
                id="billingSame"
                name="billingSame"
                checked={formData.billingSame}
                    onChange={handleChange}
                className="checkout-checkbox"
              />
              <label htmlFor="billingSame" className="checkout-checkbox-label">
                Use shipping address as billing address
                  </label>
            </div>
            <div className="checkout-summary checkout-summary-right">
              <div className="checkout-summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row checkout-summary-total">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>
            <button type="button" className="checkout-btn checkout-btn-secondary" tabIndex={-1}>
              Add Credit Card
            </button>
            <button type="submit" className="checkout-btn checkout-btn-primary">
              PLACE ORDER
            </button>
            <div className="checkout-legal">
              By continuing, you accept the{' '}
              <button type="button" className="checkout-link">terms and conditions</button> and{' '}
              <button type="button" className="checkout-link">privacy policy</button>.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout; 