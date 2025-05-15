const API_BASE_URL = 'http://localhost:3000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const api = {
  // Product related endpoints
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return handleResponse(response);
  },

  getProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  // Cart related endpoints
  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}/cart`);
    return handleResponse(response);
  },

  addToCart: async (productId, quantity = 1) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    });
    return handleResponse(response);
  },

  // Wishlist related endpoints
  getWishlist: async () => {
    const response = await fetch(`${API_BASE_URL}/wishlist`);
    return handleResponse(response);
  },

  addToWishlist: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    return handleResponse(response);
  },

  // Wardrobe related endpoints
  getWardrobe: async () => {
    const response = await fetch(`${API_BASE_URL}/wardrobe`);
    return handleResponse(response);
  },

  addToWardrobe: async (productId) => {
    const response = await fetch(`${API_BASE_URL}/wardrobe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    return handleResponse(response);
  },
};

export default api; 