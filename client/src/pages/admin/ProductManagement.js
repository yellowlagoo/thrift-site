import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../config/constants';
import { Button } from '../../components/ui';

/**
 * Product Table Row Component
 */
const ProductRow = ({ product, onEdit, onDelete }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="h-12 w-12 flex-shrink-0">
          <img 
            className="h-12 w-12 rounded-lg object-cover" 
            src={product.images?.[0] || 'https://via.placeholder.com/150'} 
            alt={product.name}
          />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900" style={{ fontFamily: FONTS.primary }}>
            {product.name}
          </div>
          <div className="text-sm text-gray-500" style={{ fontFamily: FONTS.primary }}>
            {product.brand}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
        {product.category}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" style={{ fontFamily: FONTS.primary }}>
      ${product.price}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ fontFamily: FONTS.primary }}>
      {product.size}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {product.available ? 'In Stock' : 'Sold'}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" style={{ fontFamily: FONTS.primary }}>
      {new Date(product.createdAt).toLocaleDateString()}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-600 hover:text-blue-900 font-medium"
          style={{ fontFamily: FONTS.primary }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          className="text-red-600 hover:text-red-900 font-medium"
          style={{ fontFamily: FONTS.primary }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

/**
 * Filters Component
 */
const ProductFilters = ({ filters, onFilterChange }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 
      className="text-lg font-medium mb-4"
      style={{ 
        fontFamily: FONTS.primary,
        color: COLORS.charcoal
      }}
    >
      Filters
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: FONTS.primary }}>
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
          style={{ fontFamily: FONTS.primary }}
        >
          <option value="">All Categories</option>
          <option value="t-shirts">T-Shirts</option>
          <option value="blouses">Blouses</option>
          <option value="sweaters">Sweaters</option>
          <option value="jeans">Jeans</option>
          <option value="shorts">Shorts</option>
          <option value="skirts">Skirts</option>
          <option value="dresses">Dresses</option>
          <option value="outerwear">Outerwear</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: FONTS.primary }}>
          Status
        </label>
        <select
          value={filters.available}
          onChange={(e) => onFilterChange('available', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
          style={{ fontFamily: FONTS.primary }}
        >
          <option value="">All Items</option>
          <option value="true">In Stock</option>
          <option value="false">Sold</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: FONTS.primary }}>
          Size
        </label>
        <select
          value={filters.size}
          onChange={(e) => onFilterChange('size', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
          style={{ fontFamily: FONTS.primary }}
        >
          <option value="">All Sizes</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: FONTS.primary }}>
          Search
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          placeholder="Search products..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
          style={{ fontFamily: FONTS.primary }}
        />
      </div>
    </div>
  </div>
);

/**
 * Delete Confirmation Modal
 */
const DeleteModal = ({ product, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 
          className="text-lg font-medium mb-4"
          style={{ 
            fontFamily: FONTS.primary,
            color: COLORS.charcoal
          }}
        >
          Delete Product
        </h3>
        <p 
          className="text-gray-600 mb-6"
          style={{ fontFamily: FONTS.primary }}
        >
          Are you sure you want to delete "{product?.name}"? This action cannot be undone.
        </p>
        <div className="flex space-x-4">
          <Button
            onClick={onClose}
            variant="outline"
            size="medium"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="primary"
            size="medium"
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Product Management Component
 */
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    available: '',
    size: '',
    search: ''
  });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`/api/products?${queryParams.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || data || []);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleEdit = (product) => {
    navigate(`/admin/products/edit/${product._id}`);
  };

  const handleDelete = (product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/products/${deleteModal.product._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p._id !== deleteModal.product._id));
        setDeleteModal({ isOpen: false, product: null });
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      
      switch (key) {
        case 'search':
          return product.name.toLowerCase().includes(value.toLowerCase()) ||
                 product.brand.toLowerCase().includes(value.toLowerCase());
        case 'available':
          return product.available === (value === 'true');
        default:
          return product[key] === value;
      }
    });
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.cream }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal mx-auto mb-4"></div>
          <p style={{ fontFamily: FONTS.primary, color: COLORS.charcoal }}>
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 
              className="text-4xl font-light mb-2"
              style={{ 
                fontFamily: FONTS.display,
                color: COLORS.charcoal
              }}
            >
              Product Management
            </h1>
            <p 
              className="text-lg text-gray-600"
              style={{ fontFamily: FONTS.primary }}
            >
              Manage your product inventory
            </p>
          </div>
          <Button
            as={Link}
            to="/admin/products/new"
            variant="primary"
            size="large"
            className="px-6 py-3"
          >
            + Add Product
          </Button>
        </div>

        {/* Filters */}
        <ProductFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 
              className="text-xl font-medium"
              style={{ 
                fontFamily: FONTS.primary,
                color: COLORS.charcoal
              }}
            >
              Products ({filteredProducts.length})
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-gray-300 rounded border-dashed"></div>
              </div>
              <p 
                className="text-gray-500 mb-4"
                style={{ fontFamily: FONTS.primary }}
              >
                {filters.search || filters.category || filters.available || filters.size 
                  ? 'No products match your filters.' 
                  : 'No products yet. Add your first product to get started.'}
              </p>
              {!filters.search && !filters.category && !filters.available && !filters.size && (
                <Button
                  as={Link}
                  to="/admin/products/new"
                  variant="primary"
                  size="medium"
                  className="px-6 py-2"
                >
                  Add First Product
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Added
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <ProductRow
                      key={product._id}
                      product={product}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination could go here */}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        product={deleteModal.product}
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, product: null })}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ProductManagement; 