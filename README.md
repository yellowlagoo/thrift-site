# Modern Outfit Picker E-commerce Website (Clueless-Inspired)

A modern e-commerce platform inspired by Cher's outfit picker from the movie "Clueless." The website allows users to horizontally scroll through tops and bottoms to mix and match outfits before purchasing.

## Features

- **Horizontal Outfit Builder**: Swipe through tops and bottoms to create complete outfits
- **Product Catalog**: Browse through the store inventory with category filters
- **Recommended Pairings**: Each product shows suggested matching items
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean design with smooth animations and transitions

## Tech Stack

### Frontend
- React.js (v18+)
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching
- Framer Motion for animations
- React Hook Form for form handling
- Zod for form validation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

### APIs
- Stripe for payment processing

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB installed or MongoDB Atlas account
- Stripe account for payment processing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/thrift-site.git
cd thrift-site
```

2. Install server dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

5. Start the development server:
```bash
# From the root directory
npm run dev
```

This will start both the backend server and the React development server concurrently.

## Project Structure

```
thrift-site/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source files
│       ├── components/     # React components
│       ├── App.js          # Main App component
│       └── index.js        # Entry point
├── index.js                # Express server entry point
├── package.json            # NPM dependencies
└── README.md               # Project documentation
```

## Key Features Explained

### Outfit Builder Interface
The core feature of the application is the outfit builder, which allows users to horizontally scroll through tops and bottoms to create their ideal outfit. The interface includes:

- Two parallel carousels for tops and bottoms
- Item "locking" to keep one piece static while browsing complementary items
- Total outfit price calculation
- Option to add the entire outfit to cart

### E-commerce Functionality
The application includes standard e-commerce features:

- Product catalog with filtering
- Product detail pages
- Shopping cart
- Secure checkout with Stripe
- User accounts and saved outfits

## Future Enhancements

- User authentication and profiles
- Admin dashboard for inventory management
- Outfit saving functionality
- Advanced filtering and search
- Wishlist feature
- Social sharing of outfits

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.