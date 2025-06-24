const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// GET /cart - get current user's cart with product details
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('cart.product');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /cart - add item to cart
router.post('/', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) return res.status(400).json({ message: 'Product ID required' });
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const existing = user.cart.find(item => item.product.toString() === productId);
    if (existing) {
      return res.status(400).json({ message: 'Item already in cart' });
    }
    user.cart.push({ product: productId, quantity: quantity || 1 });
    await user.save();
    res.status(201).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /cart - update quantity of an item
router.put('/', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) return res.status(400).json({ message: 'Product ID required' });
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const item = user.cart.find(item => item.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });
    item.quantity = quantity;
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /cart/:productId - remove item from cart
router.delete('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /cart - clear cart
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.cart = [];
    await user.save();
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 