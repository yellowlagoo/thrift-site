import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import BootSequence from '../components/common/BootSequence';

// Lazy load components for better performance
const Home = React.lazy(() => import('../components/Home/Home'));
const ProductDetail = React.lazy(() => import('../components/Product/ProductDetail'));
const SwissOutfitBuilder = React.lazy(() => import('../components/OutfitBuilder/SwissOutfitBuilder'));
const Wardrobe = React.lazy(() => import('../components/Wardrobe'));
const InventoryGrid = React.lazy(() => import('../components/Product/InventoryGrid'));
const CartCard = React.lazy(() => import('../components/Cart/CartCard'));
const Wishlist = React.lazy(() => import('../components/Wishlist/Wishlist'));

const AppRoutes = () => {
  // Skip boot sequence in development
  const [showBootSequence, setShowBootSequence] = useState(false);
  const location = useLocation();

  if (showBootSequence) {
    return <BootSequence onComplete={() => setShowBootSequence(false)} />;
  }

  return (
    <div className="app-container">
      {location.pathname !== '/wardrobe' && <Header />}
      <main className="main-content">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/outfit-builder" element={<SwissOutfitBuilder />} />
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/inventory" element={<InventoryGrid />} />
            <Route path="/cart" element={<CartCard />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default AppRoutes; 