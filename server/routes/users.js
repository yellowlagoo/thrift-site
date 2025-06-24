const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', auth, admin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/:id', auth, async (req, res) => {
    if (req.user.userId !== req.params.id && !req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Not found' });
        if (req.user.userId !== req.params.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Not found' });
        if (req.user.userId !== req.params.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'user deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;