const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
        index: true
    },
    passwordHash: { type: String, required: true},
    name: { 
        type: String,
        trim: true,
        maxlength: 100
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    cart: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1, min: 1, max: 10 }
    }],
    isAdmin: { type: Boolean, default: false}, 
    dateCreated: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true }
});

// Essential indexes for production (email index is handled by unique: true in schema)
userSchema.index({ isAdmin: 1 }); // Admin queries
userSchema.index({ dateCreated: -1 }); // User registration analytics
userSchema.index({ isActive: 1 }); // Active user queries
userSchema.index({ 'cart.product': 1 }); // Cart product lookups

// Remove password from JSON output
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.passwordHash;
    return user;
};

// Pre-save middleware to validate cart items
userSchema.pre('save', function(next) {
    // Remove duplicates from cart
    const uniqueCart = [];
    const seenProducts = new Set();
    
    for (const item of this.cart) {
        const productId = item.product.toString();
        if (!seenProducts.has(productId)) {
            seenProducts.add(productId);
            uniqueCart.push(item);
        }
    }
    
    this.cart = uniqueCart;
    next();
});

module.exports = mongoose.model('User', userSchema);