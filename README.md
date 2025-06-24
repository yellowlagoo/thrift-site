# Thrift Store E-commerce Platform

A full-stack e-commerce platform for thrift stores built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Admin and customer roles
  - Secure password hashing with bcrypt

- **Product Management**
  - Product catalog with categories
  - Advanced filtering and search
  - Featured products
  - Image upload support
  - Inventory management

- **Shopping Experience**
  - Shopping cart functionality
  - Favorites/wishlist
  - Order management
  - Outfit pairing suggestions

- **Security & Performance**
  - Rate limiting
  - CORS protection
  - Input validation
  - Error handling
  - Health checks

## Tech Stack

### Frontend
- React 19.1.0
- React Router DOM 7.6.0
- Redux & React-Redux
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js & Express 5.1.0
- MongoDB with Mongoose 8.15.0
- JWT for authentication
- bcryptjs for password hashing
- Express rate limiting

## Project Structure

```
thrift-site/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth, Cart)
│   │   ├── api/           # API service functions
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/       # Route controllers
│   ├── services/          # Business logic layer
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   └── package.json
├── Dockerfile            # Production container
├── docker-compose.yml    # Development setup
└── README.md
```

## Environment Variables

### Server (.env)
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/thrift-store

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-256-bits

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Configuration
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB 6.0+
- npm or yarn

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd thrift-site
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create server .env file
   cd ../server
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Using MongoDB service
   brew services start mongodb/brew/mongodb-community
   
   # Or using Docker
   docker run --name mongo -p 27017:27017 -d mongo:6.0
   ```

5. **Run the application**
   ```bash
   # Terminal 1 - Start server (from server directory)
   npm run dev
   
   # Terminal 2 - Start client (from client directory)
   npm start
   ```

   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Production Deployment

### Option 1: Docker (Recommended)

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **For production deployment**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

### Option 2: Traditional Deployment

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Set production environment variables**
   ```bash
   export NODE_ENV=production
   export MONGODB_URI=your-production-mongodb-uri
   export JWT_SECRET=your-production-jwt-secret
   # ... other environment variables
   ```

3. **Start the server**
   ```bash
   cd server
   npm start
   ```

### Platform-Specific Deployment

#### Heroku
1. Set environment variables in Heroku dashboard
2. Add MongoDB Atlas connection string
3. Deploy via Git or GitHub integration

#### Railway/Render
1. Connect your GitHub repository
2. Set environment variables
3. Configure build command: `npm run build` (for client)
4. Configure start command: `npm start` (for server)

#### AWS/Digital Ocean
1. Set up MongoDB instance or use MongoDB Atlas
2. Configure reverse proxy (nginx)
3. Set up SSL certificates
4. Configure environment variables
5. Use PM2 for process management

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Product Endpoints
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/search?q=term` - Search products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Health Check
- `GET /health` - Application health status
- `GET /metrics` - Application metrics

## Security Considerations

- JWT tokens for authentication
- Rate limiting on all endpoints
- CORS configuration for production
- Input validation and sanitization
- Password hashing with bcrypt
- Environment variable protection
- Error handling without information leakage

## Performance Optimizations

- MongoDB indexing on frequently queried fields
- Pagination for large datasets
- Image optimization (recommended)
- Caching strategy (to be implemented)
- Connection pooling

## Testing

Run the provided test scripts:

```bash
# Test authentication
./test_users.sh

# Test products API
./test_products.sh

# Test rate limiting
./test_rate_limits.sh

# Test order functionality
./test_orders.sh
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, email your-email@domain.com or create an issue in the repository. 