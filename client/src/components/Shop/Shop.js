import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import ProductList from './ProductList';

const Shop = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Extract category from URL query parameters
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('');
    }
  }, [location]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Close mobile filters after selection on mobile
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary-800">Shop Our Collection</h1>
        <button 
          className="md:hidden flex items-center text-secondary-700 hover:text-primary-500"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FontAwesomeIcon icon={showFilters ? faTimes : faFilter} className="mr-2" />
          {showFilters ? 'Close Filters' : 'Filter'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Filters */}
        <div 
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block w-full md:w-64 mr-0 md:mr-8 mb-6 md:mb-0`}
        >
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-medium text-lg mb-4 text-secondary-800">Categories</h2>
            <div className="space-y-2">
              <div 
                className={`cursor-pointer p-2 rounded ${
                  selectedCategory === '' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryChange('')}
              >
                All Products
              </div>
              <div 
                className={`cursor-pointer p-2 rounded ${
                  selectedCategory === 'tops' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryChange('tops')}
              >
                Tops
              </div>
              <div 
                className={`cursor-pointer p-2 rounded ${
                  selectedCategory === 'bottoms' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryChange('bottoms')}
              >
                Bottoms
              </div>
              <div 
                className={`cursor-pointer p-2 rounded ${
                  selectedCategory === 'dresses' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryChange('dresses')}
              >
                Dresses
              </div>
              <div 
                className={`cursor-pointer p-2 rounded ${
                  selectedCategory === 'accessories' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryChange('accessories')}
              >
                Accessories
              </div>
            </div>
          </div>

          {/* Price Range Filter (mockup, not functional in this demo) */}
          <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <h2 className="font-medium text-lg mb-4 text-secondary-800">Price Range</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">$0</span>
                <span className="text-secondary-600">$200</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-secondary-800">
                {selectedCategory 
                  ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` 
                  : 'All Products'}
              </h2>
            </div>
            <ProductList category={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 