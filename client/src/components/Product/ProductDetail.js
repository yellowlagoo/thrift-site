import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailSheet.css';

const HANDWRITTEN_FONT = 'Caveat, "Shadows Into Light", cursive';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  // Placeholder for missing fields
  const getField = (field, fallback) => (product && product[field]) || fallback;

  if (loading) {
    return <div className="product-sheet-loading">Loading...</div>;
  }
  if (error || !product) {
    return <div className="product-sheet-error">{error || 'Product not found'}</div>;
  }

  return (
    <div className="product-sheet-container">
      <div className="product-sheet-grid">
        {/* Left: Details */}
        <div className="product-sheet-details">
          <div className="product-sheet-row">
            <span className="product-sheet-label">PRODUCT SHEET</span>
            <span className="product-sheet-brand">{getField('brand', 'BRAND')}</span>
          </div>
          <div className="product-sheet-row">
            <span className="product-sheet-label">MODEL:</span>
            <span className="product-sheet-value handwritten">{getField('name', 'Model Name')}</span>
          </div>
          <div className="product-sheet-row">
            <span className="product-sheet-label">COMPOSITION:</span>
            <span className="product-sheet-value handwritten">{getField('composition', '100% Cotton')}</span>
          </div>
          <div className="product-sheet-row">
            <span className="product-sheet-label">COLOR:</span>
            <span className="product-sheet-value handwritten">{getField('color', 'Color #1')}</span>
          </div>
          <div className="product-sheet-row">
            <span className="product-sheet-label">DESIGNED FOR:</span>
            <span className="product-sheet-value handwritten">{getField('designedFor', 'Style Lovers')}</span>
          </div>
          <div className="product-sheet-row">
            <span className="product-sheet-label">MORE INFORMATION:</span>
            <span className="product-sheet-value handwritten">{getField('info', 'Visit our website')}</span>
          </div>
        </div>
        {/* Right: Image */}
        <div className="product-sheet-image-col">
          <div className="product-sheet-image-bg">
            <img src={getField('images', [])[0] || ''} alt={getField('name', '')} className="product-sheet-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 