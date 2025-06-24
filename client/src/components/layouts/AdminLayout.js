import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../config/constants';
import { Button } from '../ui';

/**
 * Admin Navigation Component
 */
const AdminNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/products', label: 'Products' },
    { path: '/admin/orders', label: 'Orders' },
    { path: '/admin/customers', label: 'Customers' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center py-4">
          {/* Left - Brand and Nav */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/admin" 
              className="flex items-center space-x-2"
            >
              <span 
                className="text-2xl font-light"
                style={{ 
                  fontFamily: FONTS.display,
                  color: COLORS.charcoal
                }}
              >
                919
              </span>
              <span 
                className="text-sm uppercase tracking-wider text-gray-500"
                style={{ fontFamily: FONTS.primary }}
              >
                Admin
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(path)
                      ? 'bg-gray-100 text-charcoal'
                      : 'text-gray-600 hover:text-charcoal hover:bg-gray-50'
                  }`}
                  style={{ fontFamily: FONTS.primary }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-charcoal transition-colors"
              style={{ fontFamily: FONTS.primary }}
            >
              View Store
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="small"
              className="px-4 py-2"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-1">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive(path)
                    ? 'bg-gray-100 text-charcoal'
                    : 'text-gray-600 hover:text-charcoal hover:bg-gray-50'
                }`}
                style={{ fontFamily: FONTS.primary }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

/**
 * Admin Layout Component
 */
const AdminLayout = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.cream }}>
      <AdminNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 