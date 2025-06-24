const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Vintage Levi's 501 Jeans",
    description: "Classic vintage Levi's 501 jeans in excellent condition. Perfect fade and comfortable fit. A timeless piece for any wardrobe.",
    brand: "Levi's",
    category: "jeans",
    size: "M",
    price: 45.00,
    condition: "Excellent",
    available: true,
    images: ["https://via.placeholder.com/400x400/4A90E2/FFFFFF?text=Vintage+Jeans"],
    tags: ["vintage", "denim", "classic"]
  },
  {
    name: "Cashmere Sweater",
    description: "Luxurious cashmere sweater in soft beige. Incredibly soft and warm, perfect for layering or wearing alone.",
    brand: "J.Crew",
    category: "sweaters",
    size: "S",
    price: 65.00,
    condition: "Good",
    available: true,
    images: ["https://via.placeholder.com/400x400/F5A623/FFFFFF?text=Cashmere+Sweater"],
    tags: ["cashmere", "luxury", "warm"]
  },
  {
    name: "Silk Blouse",
    description: "Elegant silk blouse in navy blue. Professional and stylish, perfect for work or special occasions.",
    brand: "Banana Republic",
    category: "blouses",
    size: "M",
    price: 35.00,
    condition: "Excellent",
    available: true,
    images: ["https://via.placeholder.com/400x400/50E3C2/FFFFFF?text=Silk+Blouse"],
    tags: ["silk", "professional", "elegant"]
  },
  {
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt in white. Basic essential that goes with everything. Soft and breathable fabric.",
    brand: "Uniqlo",
    category: "t-shirts",
    size: "L",
    price: 12.00,
    condition: "Good",
    available: true,
    images: ["https://via.placeholder.com/400x400/BD10E0/FFFFFF?text=Cotton+Tee"],
    tags: ["cotton", "basic", "casual"]
  },
  {
    name: "Denim Skirt",
    description: "Classic denim mini skirt in medium wash. Versatile piece that can be dressed up or down.",
    brand: "Gap",
    category: "skirts",
    size: "S",
    price: 28.00,
    condition: "Fair",
    available: true,
    images: ["https://via.placeholder.com/400x400/7ED321/FFFFFF?text=Denim+Skirt"],
    tags: ["denim", "skirt", "casual"]
  },
  {
    name: "Wool Coat",
    description: "Elegant wool coat in charcoal grey. Perfect for cold weather while maintaining a sophisticated look.",
    brand: "Zara",
    category: "outerwear",
    size: "M",
    price: 85.00,
    condition: "Excellent",
    available: false,
    images: ["https://via.placeholder.com/400x400/9013FE/FFFFFF?text=Wool+Coat"],
    tags: ["wool", "coat", "winter"]
  },
  {
    name: "Summer Dress",
    description: "Light and airy summer dress in floral print. Perfect for warm weather and outdoor events.",
    brand: "H&M",
    category: "dresses",
    size: "M",
    price: 22.00,
    condition: "Good",
    available: true,
    images: ["https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Summer+Dress"],
    tags: ["summer", "floral", "light"]
  },
  {
    name: "Leather Shorts",
    description: "Trendy leather shorts in black. Edgy and stylish, perfect for a night out or fashion-forward look.",
    brand: "Zara",
    category: "shorts",
    size: "S",
    price: 42.00,
    condition: "Excellent",
    available: true,
    images: ["https://via.placeholder.com/400x400/4ECDC4/FFFFFF?text=Leather+Shorts"],
    tags: ["leather", "trendy", "edgy"]
  }
];

async function addSampleProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products (optional)
    const existingCount = await Product.countDocuments();
    console.log(`Found ${existingCount} existing products`);

    // Add sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Successfully added ${products.length} sample products:`);
    
    products.forEach(product => {
      console.log(`- ${product.name} (${product.brand}) - $${product.price}`);
    });

    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error adding sample products:', error);
    mongoose.connection.close();
  }
}

// Run the script
addSampleProducts(); 