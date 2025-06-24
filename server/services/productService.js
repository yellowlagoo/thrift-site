const Product = require('../models/Product');

class ProductService {
    async createProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async getAllProducts(query = {}) {
        const { 
            category, 
            minPrice, 
            maxPrice, 
            brand, 
            condition, 
            size,
            featured,
            page = 1, 
            limit = 20,
            sort = 'dateCreated'
        } = query;

        // Build filter object
        const filter = {};
        if (category) filter.categoryId = category;
        if (brand) filter.brand = { $regex: brand, $options: 'i' };
        if (condition) filter.condition = condition;
        if (size) filter.size = size;
        if (featured !== undefined) filter.featured = featured === 'true';
        
        // Price range filter
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Only show available products by default
        filter.status = 'available';

        const skip = (page - 1) * limit;
        const products = await Product.find(filter)
            .populate('categoryId')
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        const total = await Product.countDocuments(filter);

        return {
            products,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }

    async getProductById(id) {
        const product = await Product.findById(id).populate('categoryId');
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async updateProduct(id, updateData) {
        const product = await Product.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        ).populate('categoryId');
        
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async deleteProduct(id) {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async searchProducts(searchTerm) {
        const regex = new RegExp(searchTerm, 'i');
        return await Product.find({
            $and: [
                { status: 'available' },
                {
                    $or: [
                        { name: regex },
                        { description: regex },
                        { brand: regex }
                    ]
                }
            ]
        }).populate('categoryId');
    }

    async getFeaturedProducts(limit = 8) {
        return await Product.find({ 
            featured: true, 
            status: 'available' 
        })
        .populate('categoryId')
        .limit(limit);
    }
}

module.exports = new ProductService();