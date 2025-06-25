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