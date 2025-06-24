import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#fafafa', borderTop: '1.5px solid #222', fontFamily: 'Playfair Display, Times New Roman, Times, serif', marginTop: '3rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 8px 18px 8px', textAlign: 'center' }}>
        <div style={{ marginBottom: 18 }}>
          <Link to="/about" style={{ margin: '0 18px', color: '#222', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, fontFamily: 'inherit' }}>About</Link>
          <Link to="/products" style={{ margin: '0 18px', color: '#222', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, fontFamily: 'inherit' }}>Shop</Link>
          <Link to="/cart" style={{ margin: '0 18px', color: '#222', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, fontFamily: 'inherit' }}>Cart</Link>
          <Link to="/favorites" style={{ margin: '0 18px', color: '#222', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, fontFamily: 'inherit' }}>Favorites</Link>
          <Link to="/account" style={{ margin: '0 18px', color: '#222', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 500, fontFamily: 'inherit' }}>Account</Link>
        </div>
        <div style={{ marginBottom: 18, color: '#444', fontSize: '1rem', fontFamily: 'inherit' }}>
          Sustainability made accessible.
        </div>
        <div style={{ color: '#888', fontSize: '0.98rem', fontFamily: 'inherit', marginTop: 18 }}>
          &copy; {new Date().getFullYear()} 919. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 