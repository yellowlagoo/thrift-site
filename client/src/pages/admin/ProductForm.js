import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { COLORS, FONTS } from '../../config/constants';
import { Button } from '../../components/ui';

/**
 * Image Upload Component
 */
const ImageUpload = ({ images, onImagesChange }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImagesChange(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    onImagesChange(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: FONTS.primary }}>
        Product Images
      </label>
      
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver 
            ? 'border-charcoal bg-gray-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
      >
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <div className="w-6 h-6 border-2 border-gray-400 rounded border-dashed"></div>
        </div>
        <p className="text-gray-600 mb-4" style={{ fontFamily: FONTS.primary }}>
          Drag & drop images here, or click to select
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          style={{ fontFamily: FONTS.primary }}
        >
          Select Images
        </label>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Form Field Component
 */
const FormField = ({ label, error, children, required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: FONTS.primary }}>
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-sm text-red-600" style={{ fontFamily: FONTS.primary }}>
        {error}
      </p>
    )}
  </div>
);

/**
 * Main Product Form Component
 */
const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    size: '',
    price: '',
    condition: '',
    available: true,
    tags: ''
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id, isEditing]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const product = await response.json();
        setFormData({
          name: product.name || '',
          description: product.description || '',
          brand: product.brand || '',
          category: product.category || '',
          size: product.size || '',
          price: product.price || '',
          condition: product.condition || '',
          available: product.available !== false,
          tags: product.tags ? product.tags.join(', ') : ''
        });
        setImages(product.images || []);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.size) newErrors.size = 'Size is required';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        images
      };

      const url = isEditing ? `/api/products/${id}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        navigate('/admin/products');
      } else {
        const error = await response.json();
        console.error('Failed to save product:', error);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.cream }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal mx-auto mb-4"></div>
          <p style={{ fontFamily: FONTS.primary, color: COLORS.charcoal }}>
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 
            className="text-4xl font-light mb-2"
            style={{ 
              fontFamily: FONTS.display,
              color: COLORS.charcoal
            }}
          >
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p 
            className="text-lg text-gray-600"
            style={{ fontFamily: FONTS.primary }}
          >
            {isEditing ? 'Update product details' : 'Add a new item to your inventory'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <FormField label="Product Name" error={errors.name} required>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
                  style={{ fontFamily: FONTS.primary }}
                  placeholder="e.g., Vintage Levi's Denim Jacket"
                />
              </FormField>

              <FormField label="Brand" error={errors.brand} required>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
                  style={{ fontFamily: FONTS.primary }}
                  placeholder="e.g., Levi's"
                />
              </FormField>

              <FormField label="Category" error={errors.category} required>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
                  style={{ fontFamily: FONTS.primary }}
                >
                  <option value="">Select Category</option>
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
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Size" error={errors.size} required>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
                    style={{ fontFamily: FONTS.primary }}
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </FormField>

                <FormField label="Price ($)" error={errors.price} required>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
                    style={{ fontFamily: FONTS.primary }}
                    placeholder="0.00"
                  />
                </FormField>
              </div>

              <FormField label="Condition" error={errors.condition} required>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
                  style={{ fontFamily: FONTS.primary }}
                >
                  <option value="">Select Condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </FormField>

              <FormField label="Tags (comma-separated)">
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
                  style={{ fontFamily: FONTS.primary }}
                  placeholder="e.g., vintage, casual, blue"
                />
              </FormField>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-charcoal focus:ring-charcoal border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700" style={{ fontFamily: FONTS.primary }}>
                  Available for sale
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <FormField label="Description" error={errors.description} required>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal focus:border-transparent"
                  style={{ fontFamily: FONTS.primary }}
                  placeholder="Describe the product, its condition, fit, and any special details..."
                />
              </FormField>

              <div>
                <ImageUpload 
                  images={images} 
                  onImagesChange={setImages}
                />
                {errors.images && (
                  <p className="text-sm text-red-600 mt-2" style={{ fontFamily: FONTS.primary }}>
                    {errors.images}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              onClick={() => navigate('/admin/products')}
              variant="outline"
              size="large"
              className="px-6 py-3"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="large"
              className="px-6 py-3"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm; 