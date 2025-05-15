import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './swiss-theme.css';
import SwissOutfitBuilder from './components/OutfitBuilder/SwissOutfitBuilder';
import Wardrobe from './components/Wardrobe';
import InventoryGrid from './components/Product/InventoryGrid';
import CartCard from './components/Cart/CartCard';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import ProductDetail from './components/Product/ProductDetail';
import IntegratedOutfitBuilder from './components/OutfitBuilder/IntegratedOutfitBuilder';
import { CartProvider } from './components/Cart/CartContext';
import { WishlistProvider } from './components/Wishlist/WishlistContext';
import Wishlist from './components/Wishlist/Wishlist';

function AppRoutes() {
  // Boot sequence state
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('Initializing system...');
  const location = useLocation();

  useEffect(() => {
    if (showBootSequence) {
      const bootInterval = setInterval(() => {
        setBootProgress(prev => {
          const newProgress = prev + 10;
          // Update boot messages based on progress
          if (newProgress === 30) {
            setBootMessage('Loading wardrobe database...');
          } else if (newProgress === 60) {
            setBootMessage('Analyzing fashion trends...');
          } else if (newProgress === 90) {
            setBootMessage('Calculating match algorithms...');
          } else if (newProgress >= 100) {
            setBootMessage('System ready!');
            setTimeout(() => setShowBootSequence(false), 1000);
            clearInterval(bootInterval);
          }
          return newProgress;
        });
      }, 400);
      return () => clearInterval(bootInterval);
    }
  }, [showBootSequence]);

  // Show boot sequence overlay with Swiss styling
  if (showBootSequence) {
    return (
      <div className="boot-overlay" style={{ background: '#000', color: '#fff', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
        <div className="boot-content" style={{ maxWidth: '600px', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>901 FASHION SYSTEM v3.0</div>
          <div style={{ fontSize: '1.25rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{bootMessage}</div>
          <div className="boot-progress" style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.2)' }}>
            <div className="boot-bar" style={{ width: `${bootProgress}%`, height: '100%', background: '#E02020', transition: 'width 0.4s ease' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Only show Header if not on /wardrobe */}
      {location.pathname !== '/wardrobe' && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/outfit-builder" element={<SwissOutfitBuilder />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/inventory" element={<InventoryGrid />} />
          <Route path="/cart" element={<CartCard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <AppRoutes />
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
