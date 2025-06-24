import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaPlus, FaShoppingBag } from 'react-icons/fa';
import { allProducts } from '../data/mockData';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      // Filter products based on search query
      const results = allProducts.filter(product => {
        const searchableText = `${product.name} ${product.description} ${product.brand || ''} ${product.condition || ''}`.toLowerCase();
        return searchableText.includes(query.toLowerCase());
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  // Load favorites and cart from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      const favoriteItems = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(favoriteItems);
    };

    const loadCart = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(cartItems);
    };

    loadFavorites();
    loadCart();

    // Listen for updates
    const handleFavoritesUpdate = () => loadFavorites();
    const handleCartUpdate = () => loadCart();

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const isItemInFavorites = (itemId) => favorites.includes(itemId);
  const isItemInCart = (itemId) => cart.includes(itemId);

  const toggleItemFavorite = (itemId) => {
    let updatedFavorites;
    if (isItemInFavorites(itemId)) {
      updatedFavorites = favorites.filter(id => id !== itemId);
    } else {
      updatedFavorites = [...favorites, itemId];
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const addItemToCart = (itemId) => {
    if (isItemInCart(itemId)) {
      const updatedCart = cart.filter(id => id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, itemId];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
    
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const goToProductDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen bg-cream" style={{ backgroundColor: '#faf9f7' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-5xl font-light text-charcoal mb-6"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#2d2d2d',
              letterSpacing: '0.02em'
            }}
          >
            Search Results
        </h1>
          <p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              lineHeight: '1.6'
            }}
          >
            {query ? (
              searchResults.length > 0 
                ? `Found ${searchResults.length} item${searchResults.length === 1 ? '' : 's'} for "${query}"`
                : `No results found for "${query}"`
            ) : 'Enter a search term to find your perfect piece'}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {searchResults.map(product => (
              <div key={product._id} className="group">
                <div className="bg-white rounded-lg shadow-elegant overflow-hidden transition-all duration-300 hover:shadow-xl">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                  <img
                      src={product.images && product.images[0]}
                    alt={product.name}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                      onClick={() => goToProductDetail(product._id)}
                    />
                    
                    {/* Favorite button overlay */}
                    <button
                      onClick={() => toggleItemFavorite(product._id)}
                      className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
                        isItemInFavorites(product._id)
                          ? 'bg-charcoal text-white'
                          : 'bg-white text-charcoal hover:bg-charcoal hover:text-white'
                      }`}
                      style={{ 
                        backgroundColor: isItemInFavorites(product._id) ? '#2d2d2d' : 'white',
                        color: isItemInFavorites(product._id) ? 'white' : '#2d2d2d'
                      }}
                    >
                      <FaPlus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 
                      className="text-lg font-light text-charcoal mb-3 cursor-pointer hover:text-gray-600 transition-colors duration-300"
                      style={{ 
                        fontFamily: "'Inter', sans-serif",
                        color: '#2d2d2d'
                      }}
                      onClick={() => goToProductDetail(product._id)}
                    >
                      {product.name}
                    </h3>
                    
                    <p 
                      className="text-gray-600 text-sm mb-4"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {product.brand} • {product.size} • {product.condition}
                    </p>

                    {/* Action button */}
                    <button
                      onClick={() => addItemToCart(product._id)}
                      className={`w-full flex items-center justify-center space-x-2 py-3 px-4 border transition-all duration-300 ${
                        isItemInCart(product._id)
                          ? 'bg-charcoal text-white border-charcoal'
                          : 'bg-white text-charcoal border-charcoal hover:bg-charcoal hover:text-white'
                      }`}
                      style={{ 
                        fontFamily: "'Inter', sans-serif",
                        backgroundColor: isItemInCart(product._id) ? '#2d2d2d' : 'white',
                        borderColor: '#2d2d2d',
                        color: isItemInCart(product._id) ? 'white' : '#2d2d2d'
                      }}
                    >
                      <FaShoppingBag className="h-4 w-4" />
                      <span className="text-sm uppercase tracking-wide">
                        {isItemInCart(product._id) ? 'Remove from Cart' : 'Add to Cart'}
                        </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 
                className="text-2xl font-light text-charcoal mb-4"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: '#2d2d2d'
                }}
              >
                No results found
              </h3>
              <p 
                className="text-gray-600 mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Try adjusting your search terms or explore our curated collections.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="btn-primary"
                style={{ 
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: '#2d2d2d'
                }}
              >
                Browse All Products
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 
                className="text-2xl font-light text-charcoal mb-4"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  color: '#2d2d2d'
                }}
              >
                Start your search
              </h3>
              <p 
                className="text-gray-600 mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Use the search bar above to find your perfect sustainable fashion piece.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 