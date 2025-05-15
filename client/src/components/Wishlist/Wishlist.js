import React, { useState } from 'react';
import { useWishlist } from './WishlistContext';
import { useCart } from '../Cart/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [expanded, setExpanded] = useState({});

  if (wishlist.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '3rem', color: '#888', fontSize: '1.2rem' }}>Your wishlist is empty.</div>;
  }

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  const handleMoveOutfitToCart = (outfit) => {
    if (outfit.type === 'outfit') {
      addToCart(outfit.top);
      addToCart(outfit.bottom);
      removeFromWishlist(outfit.id);
    } else {
      handleMoveToCart(outfit);
    }
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', letterSpacing: '0.04em' }}>Your Wishlist</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
        {wishlist.map(item => (
          <div key={item.id} style={{ border: '1px solid #eee', borderRadius: 12, background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={item.image} alt={item.name} style={{ width: '100%', maxWidth: 160, height: 160, objectFit: 'contain', marginBottom: '1rem', borderRadius: 8, background: '#fafafa' }} />
            <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 8 }}>{item.name}</div>
            {/* Outfit: Show Items button and expanded view */}
            {item.type === 'outfit' && (
              <>
                <button onClick={() => toggleExpand(item.id)} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '0.4rem 1.1rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem', marginBottom: 10 }}>
                  {expanded[item.id] ? 'Hide Items' : 'Show Items'}
                </button>
                {expanded[item.id] && (
                  <div style={{ width: '100%', marginBottom: 10 }}>
                    {[item.top, item.bottom].map((subItem, idx) => (
                      <div key={subItem.id} style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0', background: '#f8f8f8', borderRadius: 8, padding: '0.5rem 0.7rem' }}>
                        <img src={subItem.image} alt={subItem.name} style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 6, background: '#fff' }} />
                        <span style={{ fontWeight: 500 }}>{subItem.name}</span>
                        <button onClick={() => addToCart(subItem)} style={{ background: '#968576', color: '#fff', border: 'none', borderRadius: 6, padding: '0.3rem 0.9rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.92rem', marginLeft: 'auto' }}>Add to Cart</button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button onClick={() => removeFromWishlist(item.id)} style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem' }}>Remove</button>
              <button onClick={() => handleMoveOutfitToCart(item)} style={{ background: '#968576', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem' }}>Move to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist; 