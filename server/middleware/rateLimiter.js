const rateLimit = require('express-rate-limit');
// const RedisStore = require('rate-limit-redis');
// const Redis = require('ioredis');
// const Sentry = require('@sentry/node');
require('dotenv').config();

// Initialize Sentry for error tracking and monitoring
// Sentry.init({
//     dsn: process.env.SENTRY_DSN,
//     environment: process.env.NODE_ENV || 'development',
//     tracesSampleRate: 1.0,
// });

// Get environment-specific configurations
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Redis client for distributed rate limiting
// const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
//     enableOfflineQueue: false,
//     retryStrategy: (times) => {
//         const delay = Math.min(times * 50, 2000);
//         return delay;
//     }
// });

// redisClient.on('error', (err) => {
//     console.error('Redis Client Error:', err);
//     // Fallback to memory store if Redis fails
//     console.warn('Falling back to memory store for rate limiting');
// });

// Rate limit statistics collection
const rateLimitStats = {
    violations: new Map(),
    totalRequests: 0,
    blockedRequests: 0,
    
    // Add a violation
    addViolation: (data) => {
        const key = `${data.clientIP}:${data.endpoint}`;
        const current = rateLimitStats.violations.get(key) || 0;
        rateLimitStats.violations.set(key, current + 1);
        rateLimitStats.blockedRequests++;
        
        // Log to monitoring service
        // Sentry.captureMessage('Rate Limit Violation', {
        //     level: 'warning',
        //     extra: {
        //         ...data,
        //         violationCount: current + 1
        //     }
        // });
    },
    
    // Get statistics
    getStats: () => ({
        totalRequests: rateLimitStats.totalRequests,
        blockedRequests: rateLimitStats.blockedRequests,
        violationRate: rateLimitStats.totalRequests > 0 
            ? (rateLimitStats.blockedRequests / rateLimitStats.totalRequests) * 100 
            : 0,
        topViolators: Array.from(rateLimitStats.violations.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
    }),
    
    // Reset statistics (can be called periodically)
    reset: () => {
        rateLimitStats.violations.clear();
        rateLimitStats.totalRequests = 0;
        rateLimitStats.blockedRequests = 0;
    }
};

// Rate limit configurations from environment variables with fallbacks
const RATE_LIMITS = {
    // General API limits
    GENERAL_WINDOW_MS: process.env.GENERAL_RATE_LIMIT_WINDOW_MS || (isProduction ? 15 * 60 * 1000 : 60 * 1000),
    GENERAL_MAX_REQUESTS: process.env.GENERAL_RATE_LIMIT_MAX || (isProduction ? 100 : 1000),

    // Auth limits (stricter)
    AUTH_WINDOW_MS: process.env.AUTH_RATE_LIMIT_WINDOW_MS || (isProduction ? 60 * 60 * 1000 : 5 * 60 * 1000),
    AUTH_MAX_REQUESTS: process.env.AUTH_RATE_LIMIT_MAX || (isProduction ? 5 : 20),

    // Admin limits (strictest)
    ADMIN_WINDOW_MS: process.env.ADMIN_RATE_LIMIT_WINDOW_MS || (isProduction ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000),
    ADMIN_MAX_REQUESTS: process.env.ADMIN_RATE_LIMIT_MAX || (isProduction ? 50 : 200),

    // Product creation limits
    PRODUCT_CREATE_WINDOW_MS: process.env.PRODUCT_CREATE_RATE_LIMIT_WINDOW_MS || (isProduction ? 60 * 60 * 1000 : 5 * 60 * 1000),
    PRODUCT_CREATE_MAX_REQUESTS: process.env.PRODUCT_CREATE_RATE_LIMIT_MAX || (isProduction ? 10 : 50),

    // Order creation limits
    ORDER_CREATE_WINDOW_MS: process.env.ORDER_CREATE_RATE_LIMIT_WINDOW_MS || (isProduction ? 60 * 60 * 1000 : 5 * 60 * 1000),
    ORDER_CREATE_MAX_REQUESTS: process.env.ORDER_CREATE_RATE_LIMIT_MAX || (isProduction ? 5 : 20),

    // Password reset limits
    PASSWORD_RESET_WINDOW_MS: process.env.PASSWORD_RESET_RATE_LIMIT_WINDOW_MS || (isProduction ? 60 * 60 * 1000 : 5 * 60 * 1000),
    PASSWORD_RESET_MAX_REQUESTS: process.env.PASSWORD_RESET_RATE_LIMIT_MAX || (isProduction ? 3 : 10),

    // User registration limits
    REGISTRATION_WINDOW_MS: process.env.REGISTRATION_RATE_LIMIT_WINDOW_MS || (isProduction ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000),
    REGISTRATION_MAX_REQUESTS: process.env.REGISTRATION_RATE_LIMIT_MAX || (isProduction ? 3 : 10),

    // Search limits (prevent scraping)
    SEARCH_WINDOW_MS: process.env.SEARCH_RATE_LIMIT_WINDOW_MS || (isProduction ? 60 * 1000 : 10 * 1000),
    SEARCH_MAX_REQUESTS: process.env.SEARCH_RATE_LIMIT_MAX || (isProduction ? 30 : 100),

    // API key limits (for external integrations)
    API_KEY_WINDOW_MS: process.env.API_KEY_RATE_LIMIT_WINDOW_MS || (isProduction ? 60 * 1000 : 10 * 1000),
    API_KEY_MAX_REQUESTS: process.env.API_KEY_RATE_LIMIT_MAX || (isProduction ? 60 : 200),
};

// Store for rate limit data (using memory store instead of Redis)
// const store = new RedisStore({
//     client: redisClient,
//     prefix: 'rate-limit:',
//     keyGenerator: (req) => {
//         const key = req.ip;
//         return `${key}:${req.originalUrl}`;
//     }
// });

// Custom handler for rate limit exceeded
const handleRateLimitExceeded = (req, res) => {
    const clientIP = req.ip;
    const endpoint = req.originalUrl;
    const timestamp = new Date().toISOString();
    const userAgent = req.get('User-Agent');
    const method = req.method;
    
    // Enhanced logging
    const logData = {
        type: 'RATE_LIMIT_EXCEEDED',
        timestamp,
        clientIP,
        endpoint,
        method,
        userAgent,
        headers: {
            'x-forwarded-for': req.get('x-forwarded-for'),
            'x-real-ip': req.get('x-real-ip'),
            'cf-connecting-ip': req.get('cf-connecting-ip'),
        }
    };
    
    // Log the rate limit violation
    console.error('[RATE LIMIT EXCEEDED]', JSON.stringify(logData, null, 2));
    
    // Add to statistics
    rateLimitStats.addViolation(logData);
    
    // Send to monitoring service
    // Sentry.captureMessage('Rate Limit Exceeded', {
    //     level: 'warning',
    //     extra: logData
    // });
    
    // Enhanced error response
    res.status(429).json({
        error: 'Too many requests, please try again later.',
        retryAfter: res.getHeader('Retry-After'),
        timestamp,
        requestId: req.id,
        endpoint
    });
};

// Base rate limiter configuration with security best practices
const createRateLimiter = (windowMs, max, message) => rateLimit({
    windowMs,
    max,
    message,
    // store, // Commented out Redis store
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: false,
    keyGenerator: (req) => {
        // Use multiple factors for rate limiting
        const key = [
            req.ip,
            req.get('x-forwarded-for'),
            req.get('x-real-ip'),
            req.get('cf-connecting-ip'),
            req.get('user-agent')
        ].filter(Boolean).join(':');
        return key;
    },
    handler: handleRateLimitExceeded,
    // Add security headers
    headers: {
        'X-RateLimit-Limit': max,
        'X-RateLimit-Remaining': 'remaining',
        'X-RateLimit-Reset': 'reset',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    },
    // Add request validation
    validate: {
        xForwardedForHeader: true,
        trustProxy: true
    },
    // Add rate limit bypass for health checks
    skip: (req) => {
        return req.path === '/health' || req.path === '/metrics';
    },
    // Note: onLimitReached is deprecated in express-rate-limit v7+
    // Request tracking is handled in the handler function
});

// Create rate limiters with security best practices
const generalLimiter = createRateLimiter(
    RATE_LIMITS.GENERAL_WINDOW_MS,
    RATE_LIMITS.GENERAL_MAX_REQUESTS,
    'Too many requests from this IP, please try again later.'
);

const authLimiter = createRateLimiter(
    RATE_LIMITS.AUTH_WINDOW_MS,
    RATE_LIMITS.AUTH_MAX_REQUESTS,
    'Too many login attempts, please try again later.'
);

const adminLimiter = createRateLimiter(
    RATE_LIMITS.ADMIN_WINDOW_MS,
    RATE_LIMITS.ADMIN_MAX_REQUESTS,
    'Too many admin requests, please try again later.'
);

const productCreateLimiter = createRateLimiter(
    RATE_LIMITS.PRODUCT_CREATE_WINDOW_MS,
    RATE_LIMITS.PRODUCT_CREATE_MAX_REQUESTS,
    'Too many product creation attempts, please try again later.'
);

const orderCreateLimiter = createRateLimiter(
    RATE_LIMITS.ORDER_CREATE_WINDOW_MS,
    RATE_LIMITS.ORDER_CREATE_MAX_REQUESTS,
    'Too many order creation attempts, please try again later.'
);

const passwordResetLimiter = createRateLimiter(
    RATE_LIMITS.PASSWORD_RESET_WINDOW_MS,
    RATE_LIMITS.PASSWORD_RESET_MAX_REQUESTS,
    'Too many password reset attempts, please try again later.'
);

const registrationLimiter = createRateLimiter(
    RATE_LIMITS.REGISTRATION_WINDOW_MS,
    RATE_LIMITS.REGISTRATION_MAX_REQUESTS,
    'Too many registration attempts, please try again later.'
);

const searchLimiter = createRateLimiter(
    RATE_LIMITS.SEARCH_WINDOW_MS,
    RATE_LIMITS.SEARCH_MAX_REQUESTS,
    'Too many search requests, please try again later.'
);

const apiKeyLimiter = createRateLimiter(
    RATE_LIMITS.API_KEY_WINDOW_MS,
    RATE_LIMITS.API_KEY_MAX_REQUESTS,
    'API rate limit exceeded, please try again later.'
);

// Log rate limit configuration on startup
console.log('Rate Limit Configuration:', {
    environment: isProduction ? 'production' : 'development',
    limits: RATE_LIMITS,
    // store: 'Redis', // Commented out Redis reference
    security: {
        distributed: false, // Changed to false since Redis is commented out
        headers: true,
        validation: true,
        bypass: ['/health', '/metrics']
    }
});

module.exports = {
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
}; 