const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OutfitPairing = require('../models/OutfitPairing');

const initDatabase = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Create default categories if they don't exist
        const defaultCategories = [
            { name: 'T-Shirts', type: 'Top', price: 8, displayOrder: 1 },
            { name: 'Blouses', type: 'Top', price: 12, displayOrder: 2 },
            { name: 'Sweaters', type: 'Top', price: 15, displayOrder: 3 },
            { name: 'Jeans', type: 'Bottom', price: 15, displayOrder: 4 },
            { name: 'Skirts', type: 'Bottom', price: 10, displayOrder: 5 },
            { name: 'Pants', type: 'Bottom', price: 12, displayOrder: 6 },
            { name: 'Accessories', type: 'DollarItem', price: 1, displayOrder: 7 },
            { name: 'Jewelry', type: 'DollarItem', price: 1, displayOrder: 8 },
            { name: 'Belts', type: 'DollarItem', price: 1, displayOrder: 9 }
        ];

        for (const categoryData of defaultCategories) {
            const existingCategory = await Category.findOne({ name: categoryData.name });
            if (!existingCategory) {
                await Category.create(categoryData);
                console.log(`Created category: ${categoryData.name}`);
            }
        }

        // Create admin user if it doesn't exist
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@thriftstore.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
        
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            const passwordHash = await bcrypt.hash(adminPassword, 12);
            await User.create({
                email: adminEmail,
                passwordHash,
                name: 'Admin User',
                isAdmin: true,
                isActive: true
            });
            console.log(`Created admin user: ${adminEmail}`);
            console.log(`Admin password: ${adminPassword}`);
        }

        // Ensure all indexes are created
        console.log('Creating database indexes...');
        await User.createIndexes();
        await Product.createIndexes();
        await Category.createIndexes();
        await Order.createIndexes();
        await OutfitPairing.createIndexes();
        console.log('Database indexes created successfully');

        // Display database statistics
        const stats = {
            users: await User.countDocuments(),
            products: await Product.countDocuments(),
            orders: await Order.countDocuments(),
            categories: await Category.countDocuments(),
            outfits: await OutfitPairing.countDocuments()
        };
        
        console.log('\nDatabase Statistics:');
        console.log('-------------------');
        console.log(`Users: ${stats.users}`);
        console.log(`Products: ${stats.products}`);
        console.log(`Categories: ${stats.categories}`);
        console.log(`Orders: ${stats.orders}`);
        console.log(`Outfit Pairings: ${stats.outfits}`);
        
        console.log('\nDatabase initialization completed successfully!');
        
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
    }
};

// Run if called directly
if (require.main === module) {
    initDatabase();
}

module.exports = initDatabase; 