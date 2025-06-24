const mongoose = require('mongoose');

const outfitPairingSchema = new mongoose.Schema({
  topProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  bottomProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  featured: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now }
});

// Essential indexes for production
outfitPairingSchema.index({ topProductId: 1 }); // Product lookup
outfitPairingSchema.index({ bottomProductId: 1 }); // Product lookup
outfitPairingSchema.index({ featured: 1 }); // Featured outfits
outfitPairingSchema.index({ dateCreated: -1 }); // Sorting by newest
outfitPairingSchema.index({ topProductId: 1, bottomProductId: 1 }, { unique: true }); // Prevent duplicates

module.exports = mongoose.model('OutfitPairing', outfitPairingSchema);
