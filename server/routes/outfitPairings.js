const express = require('express');
const router = express.Router();
const OutfitPairing = require('../models/OutfitPairing');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', auth, admin, async (req, res) => {
    try {
        const outfitPairing = new OutfitPairing(req.body);
        await outfitPairing.save();
        res.status(201).json(outfitPairing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
  const outfitPairings = await OutfitPairing.find();
  res.json(outfitPairings);
});

router.get('/:id', async (req, res) => {
    try {
        const outfitPairing = await OutfitPairing.findById(req.params.id);
        if (!outfitPairing) return res.status(404).json({ message: 'Not found' });
        res.json(outfitPairing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', auth, admin, async (req, res) => {
    try {
        const outfitPairing = await OutfitPairing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true}
        );
        if (!outfitPairing) return res.status(404).json({ message: 'Not found' });
        res.json(outfitPairing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const outfitPairing = await OutfitPairing.findByIdAndDelete(req.params.id);
    if (!outfitPairing) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'outfitPairing deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;