const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: {type: String, enum: ['Top', 'Bottom', 'DollarItem'], required: true },
    price: { type: Number, required : true },
    displayOrder: Number
});

module.exports = mongoose.model('Category', categorySchema);