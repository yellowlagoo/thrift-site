const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');

// Middleware with expanded CORS configuration
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Serve static files from the client/build folder if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Connect to MongoDB with improved options
const connectDB = async () => {
  try {
    // Use the MongoDB Atlas cluster connection string
    const connectionString = 'mongodb+srv://Cluster79961:b3hXbVt0YUlW@cluster79961.1dbeeuu.mongodb.net/thrift-site?retryWrites=true&w=majority&appName=Cluster79961';
    console.log('Connecting to MongoDB Atlas...');
    
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout
      ssl: true,
      tls: true
    });
    
    console.log('MongoDB Connected!');
    // Initialize database after successful connection
    seedDatabase();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.log('There was an error connecting to MongoDB Atlas.');
    console.log('Please check that your cluster is available and the connection string is correct.');
    // Don't exit process to allow nodemon to restart
  }
};

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['tops', 'bottoms', 'dresses', 'accessories'], required: true },
  images: [{ type: String }], // URLs to images
  sizes: [{ type: String }],
  colors: [{ type: String }],
  inventory: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  recommendedPairings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now }
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  savedOutfits: [{
    top: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    bottom: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  }],
  shippingAddresses: [{
    street: { type: String },
    city: { type: String },
    state: { type: String},
    zipCode: { type: String },
    country: { type: String },
    isDefault: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now }
});

// Order Schema
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    size: { type: String },
    color: { type: String }
  }],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentInfo: {
    stripePaymentIntentId: { type: String },
    status: { type: String, default: 'pending' }
  },
  totalAmount: { type: Number, required: true },
  shippingMethod: { type: String, required: true },
  orderStatus: { type: String, default: 'processing', enum: ['processing', 'shipped', 'delivered', 'cancelled'] },
  trackingNumber: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Define models
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

// Seed products for demonstration purposes
const seedDatabase = async() => {
    try {
    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log('Database already has products, skipping seed');
      return;
    }
    
    console.log('Seeding database...');
    const tops = [
            {
        name: "White Button-Down Shirt",
        description: "Classic white button-down shirt, perfect for layering or wearing alone",
        price: 45.99,
        category: "tops",
        images: ["https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1287&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White"],
        inventory: 100,
        featured: true
      },
      {
        name: "Plaid Cropped Cardigan",
        description: "Yellow plaid cropped cardigan, 90s-inspired style",
        price: 39.99,
        category: "tops",
        images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1170&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Yellow", "Blue"],
        inventory: 75,
        featured: true
      },
      {
        name: "Black Turtleneck",
        description: "Soft cotton black turtleneck, essential for any wardrobe",
        price: 29.99,
        category: "tops",
        images: ["https://images.unsplash.com/photo-1519568470290-c0c1fbfff16f?q=80&w=1364&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black"],
        inventory: 120,
        featured: false
      }
    ];
    
    const bottoms = [
      {
        name: "Yellow Plaid Skirt",
        description: "Iconic yellow plaid mini skirt, perfect for creating that classic 90s look",
        price: 49.99,
        category: "bottoms",
        images: ["https://images.unsplash.com/photo-1583496661160-fb5886a773f3?q=80&w=1364&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Yellow"],
        inventory: 60,
        featured: true
            },
            {
        name: "High-Waisted Jeans",
        description: "Classic high-waisted jeans with a straight leg cut",
        price: 59.99,
        category: "bottoms",
        images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1287&auto=format&fit=crop"],
        sizes: ["24", "25", "26", "27", "28", "29", "30"],
        colors: ["Blue", "Black"],
        inventory: 90,
        featured: false
            },
            {
        name: "Black Mini Skirt",
        description: "Versatile black mini skirt, perfect for mixing and matching",
        price: 35.99,
        category: "bottoms",
        images: ["https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=1170&auto=format&fit=crop"],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Black"],
        inventory: 80,
        featured: false
      }
    ];
    
    await Product.insertMany([...tops, ...bottoms]);
    
    // Update recommended pairings
    const allProducts = await Product.find();
    
    // Match tops with bottoms
    for (const top of allProducts.filter(p => p.category === 'tops')) {
      const recommendedBottoms = allProducts
        .filter(p => p.category === 'bottoms')
        .slice(0, 2)
        .map(p => p._id);
        
      await Product.findByIdAndUpdate(top._id, { recommendedPairings: recommendedBottoms });
    }
    
    // Match bottoms with tops
    for (const bottom of allProducts.filter(p => p.category === 'bottoms')) {
      const recommendedTops = allProducts
        .filter(p => p.category === 'tops')
        .slice(0, 2)
        .map(p => p._id);

      await Product.findByIdAndUpdate(bottom._id, { recommendedPairings: recommendedTops });
    }
    
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// API Routes
// Products
app.get('/api/products', async (req, res) => {
    try {
    console.log('GET /api/products request received');
    const { category } = req.query;
    const filter = category ? { category } : {};
    console.log('Searching with filter:', filter);
    
    const allProducts = await Product.find(filter).lean();
    console.log(`Found ${allProducts.length} products`);

    return res.json(allProducts);
    } catch (error) {
    console.error('Error in /api/products:', error);
    return res.status(500).json({error: 'Internal Server Error', message: error.message});
    }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    console.log(`GET /api/products/${req.params.id} request received`);
    const product = await Product.findById(req.params.id)
      .populate('recommendedPairings')
      .lean();
    
    if (!product) {
      console.log(`Product with ID ${req.params.id} not found`);
      return res.status(404).json({ error: 'Product not found' });
    }
    
    console.log('Product found:', product.name);
    return res.json(product);
  } catch (error) {
    console.error(`Error in /api/products/${req.params.id}:`, error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.get('/api/outfit-suggestions', async (req, res) => {
  try {
    console.log('GET /api/outfit-suggestions request received');
    const tops = await Product.find({ category: 'tops' }).lean();
    const bottoms = await Product.find({ category: 'bottoms' }).lean();
    
    console.log(`Found ${tops.length} tops and ${bottoms.length} bottoms`);
    return res.json({ tops, bottoms });
  } catch (error) {
    console.error('Error in /api/outfit-suggestions:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Connect to database first, then start server
connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});