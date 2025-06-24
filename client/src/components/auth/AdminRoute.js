import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { COLORS, FONTS } from '../../config/constants';

/**
 * Admin Route Protection Component
 * Ensures only authenticated admin users can access admin routes
 */
const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifyAdminStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsVerifying(false);
        return;
      }

      try {
        // Verify admin status with the backend
        const response = await fetch('http://localhost:3001/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setIsAdmin(userData.isAdmin || false);
        }
      } catch (error) {
        console.error('Failed to verify admin status:', error);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAdminStatus();
  }, []);

  // Show loading spinner while verifying
  if (loading || isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.cream }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal mx-auto mb-4"></div>
          <p style={{ fontFamily: FONTS.primary, color: COLORS.charcoal }}>
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user && !localStorage.getItem('token')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.cream }}>
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-red-300 rounded-full"></div>
          </div>
          <h2 
            className="text-2xl font-light mb-4"
            style={{ 
              fontFamily: FONTS.display,
              color: COLORS.charcoal
            }}
          >
            Access Denied
          </h2>
          <p 
            className="text-gray-600 mb-6"
            style={{ fontFamily: FONTS.primary }}
          >
            You don't have permission to access this area. Admin privileges are required.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-charcoal hover:bg-gray-800"
            style={{ fontFamily: FONTS.primary }}
          >
            Return to Store
          </a>
        </div>
      </div>
    );
  }

  // Render admin content
  return children;
};

export default AdminRoute; 