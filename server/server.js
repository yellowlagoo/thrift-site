const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { 
    generalLimiter, 
    authLimiter, 
    adminLimiter, 
    productCreateLimiter,
    orderCreateLimiter,
    passwordResetLimiter,
    registrationLimiter,
    searchLimiter,
    apiKeyLimiter,
    rateLimitStats
} = require('./middleware/rateLimiter');
const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? (process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : false)
        : true, // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    credentials: true,
    maxAge: 86400 // 24 hours
}));

app.use(express.json({
    limit: '10kb', // Limit payload size
    strict: true, // Only accept arrays and objects
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            res.status(400).json({ error: 'Invalid JSON' });
            throw new Error('Invalid JSON');
        }
    }
}));

// Apply rate limiting to specific routes FIRST
app.use('/api/auth/login', authLimiter); // Login attempts
app.use('/api/auth/register', registrationLimiter); // Registration attempts
app.use('/api/auth/reset-password', passwordResetLimiter); // Password reset attempts
app.use('/api/users', adminLimiter); // Admin-level limits for user management
app.use('/api/categories', adminLimiter); // Admin-level limits for category management
app.use('/api/products/create', productCreateLimiter); // Product creation limits
app.use('/api/orders/create', orderCreateLimiter); // Order creation limits
app.use('/api/search', searchLimiter); // Search limits
app.use('/api/external', apiKeyLimiter); // API key limits

// Apply general limiter LAST
app.use(generalLimiter); // General limits for all other routes

app.use(helmet()); // Add helmet for security headers

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 3001;

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/outfits', require('./routes/outfitPairings'));
app.use('/cart', require('./routes/cart'));
app.use('/api/stripe', require('./routes/stripe'));
app.use('/api/admin', require('./routes/admin'));

// Health check endpoint (bypasses rate limiting)
app.get('/health', async (req, res) => {
    try {
        const DatabaseHealth = require('./utils/dbHealth');
        const dbHealth = await DatabaseHealth.performHealthCheck();
        
        const isHealthy = dbHealth.database.connected;
        const status = isHealthy ? 'healthy' : 'unhealthy';
        const statusCode = isHealthy ? 200 : 503;
        
        res.status(statusCode).json({ 
            status,
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            database: dbHealth
        });
    } catch (error) {
        res.status(503).json({ 
            status: 'unhealthy',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Metrics endpoint (bypasses rate limiting)
app.get('/metrics', (req, res) => {
    res.status(200).json({ 
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});

// Rate limit statistics endpoint (admin only)
app.get('/api/admin/rate-limits', require('./middleware/auth'), require('./middleware/admin'), (req, res) => {
    const stats = rateLimitStats.getStats();
    res.status(200).json({
        ...stats,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Reset rate limit statistics (admin only)
app.post('/api/admin/rate-limits/reset', require('./middleware/auth'), require('./middleware/admin'), (req, res) => {
    rateLimitStats.reset();
    res.status(200).json({ 
        message: 'Rate limit statistics reset successfully',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware (must be after all routes)
app.use(require('./middleware/errorHandler'));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

if (debug) {
    const Category = require('./models/Category');
    const Product = require('./models/Product');
    const User = require('./models/User');
    const Order = require('./models/Order');
    const OutfitPairing = require('./models/OutfitPairing');

    app.get('/test-category', async (req, res) => {
        const cat = new Category({
            name: 'T-shirt',
            type: 'Top',
            price: 5,
            displayOrder: 1
        });
        await cat.save();
    
        const categories = await Category.find();
        res.json(categories);
    });

    app.get('/test-product', async (req, res) => {
        const categoryId = '682d2e23283a1fe471ccc1c1';

        const prod = new Product({
            name: 'Black shirt',
            description: 'A stylish t-shirt.',
            categoryId: categoryId,
            size: 'M',
            brand: 'BrandX',
            condition: 'Excellent',
            images: [],
            status: 'available',
            featured: false
        });
        await prod.save();
    
        const products = await Product.find();
        res.json(products);
    });

    app.get('/test-user', async (req, res) => {
        // Create a new user
        const user = new User({
            email: 'testuser2@example.com',
            passwordHash: 'hashedpassword123',
            name: 'Test User 2',
            favorites: ['682d37d458534c2a1a3c6c7c', '682d36215f70a91d6c597a8f'],
            cart: [{ product: '682d37d458534c2a1a3c6c7c', quantity: 2 }]
          });
        await user.save();
      
        // Find all users
        const users = await User.find();
        res.json(users);
      });

    app.get('/test-order', async(req, res) => {
        const userId = '682d37717e21261f6271a762';
        const prodId = '682d36215f70a91d6c597a8f';

        const order = new Order({
            userId: userId,
            items: [{
                productId: prodId,
                name: 'Black shirt',
                price: 5
            }],
            totalAmount: 5,
            shippingAddress: {
                name: 'jane doe',
                street: 'ex st',
                city: 'ex city',
                state: 'ex state',
                zip: 'ex z1pc0d3',
                country: 'USA'
            },
        });
        await order.save();
        const orders = await Order.find();
        res.json(orders);
    });

    app.get('/test-outfitpairing', async(req, res) => {
        const prodId = '682d36215f70a91d6c597a8f';

        const outfitPair = new OutfitPairing({
            topProductId: prodId,
            bottomProductId: prodId
        });
        await outfitPair.save();

        const pairs = await OutfitPairing.find();
        res.json(pairs);
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});