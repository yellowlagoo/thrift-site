const productService = require('../services/productService');
const asyncHandler = require('../middleware/asyncHandler');

const productController = {
    // Create product - Admin only
    createProduct: asyncHandler(async (req, res) => {
        const product = await productService.createProduct(req.body);
        res.status(201).json({
            success: true,
            data: product
        });
    }),

    // Get all products with filtering and pagination
    getAllProducts: asyncHandler(async (req, res) => {
        const result = await productService.getAllProducts(req.query);
        res.json({
            success: true,
            data: result.products,
            pagination: result.pagination
        });
    }),

    // Get single product by ID
    getProduct: asyncHandler(async (req, res) => {
        const product = await productService.getProductById(req.params.id);
        res.json({
            success: true,
            data: product
        });
    }),

    // Update product - Admin only
    updateProduct: asyncHandler(async (req, res) => {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json({
            success: true,
            data: product
        });
    }),

    // Delete product - Admin only
    deleteProduct: asyncHandler(async (req, res) => {
        await productService.deleteProduct(req.params.id);
        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    }),

    // Search products
    searchProducts: asyncHandler(async (req, res) => {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({
                success: false,
                error: 'Search query is required'
            });
        }

        const products = await productService.searchProducts(q);
        res.json({
            success: true,
            data: products
        });
    }),

    // Get featured products
    getFeaturedProducts: asyncHandler(async (req, res) => {
        const limit = req.query.limit || 8;
        const products = await productService.getFeaturedProducts(limit);
        res.json({
            success: true,
            data: products
        });
    })
};

module.exports = productController; 