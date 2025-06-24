import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COLORS, FONTS } from '../../config/constants';
import { Button } from '../../components/ui';

/**
 * Stats Card Component
 */
const StatsCard = ({ title, value, subtitle, trend, color = 'charcoal' }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: COLORS[color] }}>
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide" style={{ fontFamily: FONTS.primary }}>
          {title}
        </p>
        <p 
          className="text-3xl font-light mt-2"
          style={{ 
            fontFamily: FONTS.display,
            color: COLORS.charcoal
          }}
        >
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: FONTS.primary }}>
            {subtitle}
          </p>
        )}
      </div>
      {trend && (
        <div className={`text-sm font-medium px-2 py-1 rounded ${
          trend > 0 ? 'text-green-600 bg-green-50' : 
          trend < 0 ? 'text-red-600 bg-red-50' : 
          'text-gray-600 bg-gray-50'
        }`}>
          {trend > 0 ? '+' : ''}{trend}%
        </div>
      )}
    </div>
  </div>
);

/**
 * Quick Action Card Component
 */
const QuickActionCard = ({ title, description, to, variant = 'primary' }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
    <div className="flex flex-col h-full">
      <h3 
        className="text-lg font-medium mb-2"
        style={{ 
          fontFamily: FONTS.primary,
          color: COLORS.charcoal
        }}
      >
        {title}
      </h3>
      <p 
        className="text-sm text-gray-600 mb-6 flex-1"
        style={{ fontFamily: FONTS.primary }}
      >
        {description}
      </p>
      <Button
        as={Link}
        to={to}
        variant={variant}
        size="small"
        className="px-4 py-2 w-full"
      >
        Get Started
      </Button>
    </div>
  </div>
);

/**
 * Recent Orders Component
 */
const RecentOrdersTable = ({ orders = [], loading = false }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 
        className="text-xl font-medium"
        style={{ 
          fontFamily: FONTS.primary,
          color: COLORS.charcoal
        }}
      >
        Recent Orders
      </h2>
    </div>
    
    {loading ? (
      <div className="px-6 py-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal mx-auto mb-4"></div>
        <p 
          className="text-gray-500"
          style={{ fontFamily: FONTS.primary }}
        >
          Loading orders...
        </p>
      </div>
    ) : orders.length === 0 ? (
      <div className="px-6 py-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-2 border-gray-300 rounded border-dashed"></div>
        </div>
        <p 
          className="text-gray-500"
          style={{ fontFamily: FONTS.primary }}
        >
          No orders yet. Orders will appear here once customers start purchasing.
        </p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.slice(0, 5).map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order._id.slice(-6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customerEmail || order.userId?.email || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.amount || order.totalAmount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    
    {orders.length > 0 && (
      <div className="px-6 py-3 border-t border-gray-200">
        <Link 
          to="/admin/orders"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          style={{ fontFamily: FONTS.primary }}
        >
          View all orders →
        </Link>
      </div>
    )}
  </div>
);

/**
 * Main Admin Dashboard Component
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch stats and orders in parallel
      const [statsResponse, ordersResponse] = await Promise.all([
        fetch('http://localhost:3001/api/admin/stats', { headers }),
        fetch('http://localhost:3001/api/orders?limit=5', { headers })
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      } else {
        console.error('Failed to fetch stats:', statsResponse.statusText);
      }

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setRecentOrders(ordersData.orders || ordersData || []);
      } else {
        console.error('Failed to fetch orders:', ordersResponse.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
      setOrdersLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Upload a new item to your store with photos and details',
      to: '/admin/products/new',
      variant: 'primary'
    },
    {
      title: 'Manage Inventory',
      description: 'View, edit, and organize your product catalog',
      to: '/admin/products',
      variant: 'outline'
    },
    {
      title: 'View Orders',
      description: 'Process orders and update fulfillment status',
      to: '/admin/orders',
      variant: 'outline'
    },
    {
      title: 'Customer Management',
      description: 'View customer accounts and order history',
      to: '/admin/customers',
      variant: 'outline'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.cream }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal mx-auto mb-4"></div>
          <p style={{ fontFamily: FONTS.primary, color: COLORS.charcoal }}>
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 
            className="text-4xl font-light mb-4"
            style={{ 
              fontFamily: FONTS.display,
              color: COLORS.charcoal
            }}
          >
            Admin Dashboard
          </h1>
          <p 
            className="text-lg text-gray-600"
            style={{ fontFamily: FONTS.primary }}
          >
            Manage your 919 store from here
          </p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm" style={{ fontFamily: FONTS.primary }}>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Products"
            value={stats.totalProducts || 0}
            subtitle="Items in inventory"
            color="charcoal"
          />
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders || 0}
            subtitle="All time orders"
            color="charcoal"
          />
          <StatsCard
            title="Revenue"
            value={`$${(stats.totalRevenue || 0).toFixed(2)}`}
            subtitle="Total earnings"
            color="charcoal"
          />
          <StatsCard
            title="Customers"
            value={stats.totalUsers || 0}
            subtitle="Registered users"
            color="charcoal"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 
            className="text-2xl font-light mb-6"
            style={{ 
              fontFamily: FONTS.display,
              color: COLORS.charcoal
            }}
          >
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                {...action}
              />
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <RecentOrdersTable orders={recentOrders} loading={ordersLoading} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 