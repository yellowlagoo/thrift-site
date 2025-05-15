import React from 'react';
import './InventoryGrid.css';

// Placeholder inventory data
const inventory = [
  {
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    brand: 'PRADA',
    description: 'Slim-fit denim jeans in classic indigo.'
  },
  {
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    brand: 'INOV-8',
    description: 'Trail running sneakers with blue accents.'
  },
  {
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    brand: 'HERMÈS',
    description: 'Long-sleeve navy cotton tee.'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    brand: 'KLATTERMUSEN',
    description: 'Down-filled black puffer vest.'
  },
  {
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    brand: 'FRAY',
    description: 'Sky blue oxford shirt.'
  },
  {
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    brand: 'SUPREME',
    description: 'Green corduroy cap with logo.'
  }
];

const InventoryGrid = () => {
  return (
    <div className="inventory-grid-container">
      <h1 className="inventory-title">INVENTORY</h1>
      <div className="inventory-grid">
        {inventory.map((item, idx) => (
          <div className="inventory-item" key={idx}>
            <div className="inventory-img-border">
              <img src={item.image} alt={item.brand} className="inventory-img" />
              <svg className="inventory-border-svg" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20 Q5 110 20 210 Q110 215 210 200 Q215 110 200 20 Q110 5 10 20 Z" stroke="#111" strokeWidth="3" fill="none"/>
              </svg>
            </div>
            <div className="inventory-info">
              <div className="inventory-brand">{item.brand}</div>
              <div className="inventory-desc">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryGrid; 