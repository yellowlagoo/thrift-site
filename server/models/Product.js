const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    size: String,
    brand: String,
    condition: String, 
    images: [String],
    status: { type: String, enum: [ 'available', 'sold' ], required: true, default: 'available'},
    featured: { type: Boolean, default: false },
    dateAdded: { type: Date, default: Date.now },
    soldAt: { type: Date },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
});

// Essential indexes for production performance
productSchema.index({ status: 1 }); // Most common filter
productSchema.index({ categoryId: 1, status: 1 }); // Category + status filtering
productSchema.index({ featured: 1, status: 1 }); // Featured products query
productSchema.index({ price: 1, status: 1 }); // Price range filtering
productSchema.index({ brand: 1, status: 1 }); // Brand filtering
productSchema.index({ dateAdded: -1 }); // Sorting by newest
productSchema.index({ name: 'text', description: 'text', brand: 'text' }); // Text search
productSchema.index({ size: 1, status: 1 }); // Size filtering
productSchema.index({ condition: 1, status: 1 }); // Condition filtering

// Compound index for complex queries
productSchema.index({ 
    status: 1, 
    categoryId: 1, 
    price: 1, 
    featured: 1 
});

module.exports = mongoose.model('Product', productSchema);