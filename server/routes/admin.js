const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard statistics
 * @access  Admin only
 */
router.get('/stats', auth, admin, asyncHandler(async (req, res) => {
  try {
    const [totalProducts, totalUsers, totalOrders, revenueResult] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments({ isAdmin: { $ne: true } }), // Exclude admin users
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch dashboard statistics' 
    });
  }
}));

/**
 * @route   GET /api/admin/recent-activity
 * @desc    Get recent activity for dashboard
 * @access  Admin only
 */
router.get('/recent-activity', auth, admin, asyncHandler(async (req, res) => {
  try {
    const [recentProducts, recentOrders, recentUsers] = await Promise.all([
      Product.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name brand price createdAt'),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userId', 'email')
        .select('amount status createdAt userId'),
      User.find({ isAdmin: { $ne: true } })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('email createdAt')
    ]);

    res.json({
      recentProducts,
      recentOrders,
      recentUsers
    });
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch recent activity' 
    });
  }
}));

/**
 * @route   GET /api/admin/analytics
 * @desc    Get analytics data for dashboard
 * @access  Admin only
 */
router.get('/analytics', auth, admin, asyncHandler(async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [salesData, categoryData, monthlyRevenue] = await Promise.all([
      // Daily sales for the last 30 days
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo },
            status: 'completed'
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
            },
            sales: { $sum: 1 },
            revenue: { $sum: '$amount' }
          }
        },
        { $sort: { _id: 1 } }
      ]),

      // Products by category
      Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ]),

      // Monthly revenue for the last 6 months
      Order.aggregate([
        {
          $match: {
            status: 'completed',
            createdAt: { 
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
            }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m', date: '$createdAt' }
            },
            revenue: { $sum: '$amount' },
            orders: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])
    ]);

    res.json({
      salesData,
      categoryData,
      monthlyRevenue
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch analytics data' 
    });
  }
}));

module.exports = router; 