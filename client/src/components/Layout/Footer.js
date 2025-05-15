import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer-swiss">
      <div className="container">
        {/* Brand and Description */}
        <div>
          <h3 className="footer-title">901</h3>
          <p>
            Secondhand, sustainable.
          </p>
          <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)' }}>
            <a href="#" style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>
              <FontAwesomeIcon icon={faPinterest} />
            </a>
          </div>
        </div>
        
        {/* Shop Links */}
        <div>
          <h4 className="footer-title">SHOP</h4>
          <ul className="footer-links">
            <li>
              <Link to="/shop?category=tops">TOPS</Link>
            </li>
            <li>
              <Link to="/shop?category=bottoms">BOTTOMS</Link>
            </li>
            <li>
              <Link to="/shop?category=dresses">DRESSES</Link>
            </li>
            <li>
              <Link to="/shop?category=accessories">ACCESSORIES</Link>
            </li>
            <li>
              <Link to="/outfit-builder">OUTFIT BUILDER</Link>
            </li>
          </ul>
        </div>
        
        {/* Information */}
        <div>
          <h4 className="footer-title">INFORMATION</h4>
          <ul className="footer-links">
            <li>
              <Link to="/about">ABOUT US</Link>
            </li>
            <li>
              <Link to="/contact">CONTACT</Link>
            </li>
            <li>
              <Link to="/shipping">SHIPPING POLICY</Link>
            </li>
            <li>
              <Link to="/returns">RETURNS & EXCHANGES</Link>
            </li>
            <li>
              <Link to="/terms">TERMS OF SERVICE</Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="container" style={{ marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          &copy; {new Date().getFullYear()} 901. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 