import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductItem = ({ product }) => {
  return (
    <div style={{ 
      position: 'relative',
      border: '1px solid var(--color-border)',
    }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ 
            width: '100%', 
            aspectRatio: '1/1.2',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <button style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '10px', 
          background: 'var(--color-bg-primary)', 
          border: 'none',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <FontAwesomeIcon icon={faHeart} style={{ fontSize: '16px' }} />
        </button>
      </div>

      <div style={{ padding: 'var(--space-md)' }}>
        <p style={{ 
          fontSize: 'var(--font-xs)', 
          textTransform: 'uppercase', 
          marginBottom: 'var(--space-xs)', 
          color: 'var(--color-text-tertiary)' 
        }}>
          {product.category}
        </p>
        
        <h3 style={{ 
          fontSize: 'var(--font-sm)', 
          fontWeight: '600', 
          textTransform: 'uppercase',
          marginBottom: 'var(--space-sm)'
        }}>
          <Link to={`/product/${product._id}`} style={{ color: 'var(--color-text-primary)' }}>
            {product.name}
          </Link>
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ 
            fontSize: 'var(--font-sm)', 
            fontWeight: '600' 
          }}>
            ${product.price.toFixed(2)}
          </p>
          
          <button style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px'
          }}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
