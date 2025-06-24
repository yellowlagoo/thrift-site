const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', auth, async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', auth, admin, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Not found' });
        if (order.userId.toString() !== req.user.userId && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Not found' });
        if (order.userId.toString() !== req.user.userId && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        );
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

router.delete('/:id', auth, async (req, res) => {
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Not found' });
        if (order.userId.toString() !== req.user.userId && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        order = await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'order deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;