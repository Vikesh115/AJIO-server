# ajio API Backend with Node.js & MongoDB

A complete implementation of ajio e-commerce app with MongoDB persistence, built with Node.js, Express, and Mongoose.

- Backend URL: https://ajio-server.onrender.com
- Docs URL: https://ajio-server.onrender.com/api-docs/

## Features

- **Full CRUD API**
- **MongoDB integration** for data persistence
- **Automated data population**
- **RESTful endpoints** with proper status codes
- **Ready for production** with best practices

## API Endpoints

| Endpoint | Method | Description	| Auth Required |
| /api/auth/register | POST | Register a new user | ❌ |
| /api/auth/login | POST | Login | existing user | ❌ |

| Endpoint | Method | Description | Auth Required |
| /api/products | GET | Get all products | ❌ |
| /api/products/:id | GET | Get single product by ID | ❌ |
| /api/products/categories | GET | Get all available categories | ❌ |
| /api/products/category/:category | GET	Filter products by category | ❌ |
| /api/products/fetch-products | GET | Fetch & save products from FakeStoreAPI | (admin) |
| /api/cart | POST | Create new cart (auto-created on register) | ✔️ |
| /api/cart | GET | Get user's cart with all items | ✔️ |
| /api/cart/add | POST | Add product to cart | ✔️ |
| /api/cart/:productId | DELETE | Remove product from cart | ✔️ |
| /api/cart/:productId | PUT | Update product quantity in cart | ✔️ |
| /api/wishlist | POST | Create new wishlist (auto-created on register) | ✔️ |
| /api/wishlist | GET | Get user's wishlist | ✔️ |
| /api/wishlist/add | POST | Add product to wishlist | ✔️ |
| /api/wishlist/:productId | DELETE | Remove product from wishlist | ✔️ |

## Prerequisites

- Node.js 16+
- MongoDB 5+
- npm/yarn

## Installation && run project

1. Clone the repository:
 - git clone https://github.com/Vikesh115/AJIO-server.git
 - npm install (install dependencies)
 - npm run dev (development mode with hot reload)
 - npm start (production mode)
 - npm test (test mode)

## Project structure

 - AJIO-api/
 - ├── config/
 - │   ├── db.js           # MongoDB connection
 - ├── controllers/
 - │   ├── authController.js
 - │   ├── cartController.js
 - │   ├── productController.js
 - │   └── wishlistController.js
 - ├── middleware/
 - │   ├── auth.js         # Authentication middleware
 - ├── models/
 - │   ├── Cart.js
 - │   ├── Product.js
 - │   ├── User.js
 - │   └── Wishlist.js
 - ├── routes/
 - │   ├── authRoutes.js
 - │   ├── cartRoutes.js
 - │   ├── productRoutes.js
 - │   └── wishlistRoutes.js
 - ├── tests/
 - │   ├── products.test.js
 - ├── .env
 - ├── app.js              # Main application
 - ├── package.json
 - ├── README.md
 - └── swagger.js

## Technologies used

 - Backend: Node.js, Express
 - Database: MongoDB, Mongoose
 - Testing: Jest, Superset
 - Dev Tools: Nodemon

## Author

Vikesh Raut - https://github.com/Vikesh115