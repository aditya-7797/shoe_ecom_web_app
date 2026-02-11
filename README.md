# 🛍️ Shoes E-Commerce Web Application

A full-stack modern e-commerce web application for showcasing and selling shoes, featuring a dynamic React frontend with Tailwind CSS and a robust Node.js backend with MySQL database.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
- [🚀 Quick Start](#-quick-start)
- [📊 Database Schema](#-database-schema)
- [🔗 API Endpoints](#-api-endpoints)
- [🎨 Frontend Pages](#-frontend-pages)
- [🧪 Testing](#-testing)
- [🐳 Docker Setup](#-docker-setup)
- [🔧 Development](#-development)
- [📦 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

## ✨ Features

### Customer Features
- **Dynamic Homepage** with carousel banners and modern UI
- **Product Catalog** with 16+ shoes displayed in responsive grid (4 per row)
- **Product Details** with image gallery (3-4 images), ratings, and reviews
- **Shopping Cart** with quantity management and checkout flow
- **User Authentication** (login/signup)
- **Customer Reviews** and ratings system
- **Contact Form** for customer inquiries
- **Responsive Design** optimized for all devices

### Admin Features
- **Admin Dashboard** with comprehensive overview
- **Product Management** (Create, Read, Update, Delete)
- **Image Management** for product galleries
- **Contact Request Management** with status tracking
- **Admin Authentication** with role-based access

## 🛠️ Tech Stack

### Frontend
- **React 18** with modern functional components
- **Vite** for fast development and building
- **React Router DOM** for client-side routing
- **Tailwind CSS** for responsive styling
- **Axios** for API communication
- **Jest** and **React Testing Library** for testing

### Backend
- **Node.js** with **Express.js** framework
- **MySQL 8.0** database with **Sequelize ORM**
- **JWT** authentication with **bcrypt** password hashing
- **Express Validator** for input validation
- **CORS** enabled for cross-origin requests
- **Jest** and **Supertest** for API testing

### DevOps & Tools
- **Docker Compose** for containerized MySQL
- **ESLint** for code quality
- **Nodemon** for development hot-reload
- **Git** version control

## 🏗️ Project Structure

```
ecom_webapp/
├── backend/                     # Node.js API server
│   ├── src/
│   │   ├── api/                # Route handlers
│   │   │   ├── admin-contacts.js
│   │   │   ├── admin-products.js
│   │   │   ├── auth.js
│   │   │   ├── cart.js
│   │   │   ├── index.js
│   │   │   ├── product-detail.js
│   │   │   ├── products.js
│   │   │   └── reviews.js
│   │   ├── middleware/          # Express middleware
│   │   │   ├── auth.js
│   │   │   └── error.js
│   │   ├── models/              # Sequelize models
│   │   │   ├── index.js
│   │   │   └── migrations/      # Database migrations
│   │   ├── services/            # Business logic
│   │   │   ├── cartService.js
│   │   │   ├── productImageService.js
│   │   │   └── seed.js
│   │   ├── utils/               # Utility functions
│   │   │   ├── auth.js
│   │   │   ├── jwt.js
│   │   │   └── logger.js
│   │   └── server.js           # Application entry point
│   ├── tests/                   # Test suites
│   │   └── contract/           # API contract tests
│   ├── package.json
│   └── .env.example
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminNavbar.jsx
│   │   │   ├── AdminProductImages.jsx
│   │   │   ├── Carousel.jsx
│   │   │   ├── ImageGallery.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetailActions.jsx
│   │   │   └── UserLayout.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Admin*.jsx
│   │   ├── services/           # API service layer
│   │   │   ├── api.js
│   │   │   └── cart.js
│   │   ├── styles/
│   │   │   └── tailwind.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tests/                  # Frontend tests
│   │   ├── integration/
│   │   └── setup/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── jest.config.js
│   └── babel.config.js
├── specs/                      # Project documentation
│   └── 001-shoes-ecom/
│       ├── spec.md            # Feature specifications
│       ├── data-model.md      # Database design
│       ├── plan.md            # Development plan
│       └── quickstart.md      # Setup guide
├── docker-compose.yml          # MySQL container config
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 20.x** or higher
- **npm** package manager
- **Docker** and **Docker Compose** (for MySQL)
- **Git** (optional)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecom_webapp
```

### 2. Database Setup
```bash
# Start MySQL container
docker-compose up -d mysql

# Verify MySQL is running
docker ps
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration (default values should work)
# PORT=4000
# DATABASE_URL=mysql://appuser:apppass@localhost:3307/shoesdb
# JWT_SECRET=jdhjdjdjdjgvxvnsvhdvhdvhdvhdvhcvdh
# BCRYPT_SALT_ROUNDS=11

# Start development server (includes database sync and seeding)
npm run dev
```

The backend will:
- Connect to MySQL and sync database schema
- Seed initial products and admin user
- Start API server on http://localhost:4000

### 4. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_BASE=http://localhost:4000/api" > .env

# Start development server
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000/api
- **API Health Check**: http://localhost:4000/api/health

### 6. Default Admin Credentials
- **Email**: admin@example.com
- **Password**: adminpass123

## 📊 Database Schema

### Core Entities

#### Products
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  modelName VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  rating FLOAT(2,1) DEFAULT 0,
  status ENUM('active', 'archived') DEFAULT 'active',
  createdAt DATETIME,
  updatedAt DATETIME
);
```

#### Product Images
```sql
CREATE TABLE product_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  altText VARCHAR(255),
  order INT DEFAULT 0,
  FOREIGN KEY (productId) REFERENCES products(id)
);
```

#### Users & Authentication
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt DATETIME
);
```

#### Shopping Cart
```sql
CREATE TABLE carts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  sessionId VARCHAR(255),
  subtotal DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) DEFAULT 0,
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cartId INT NOT NULL,
  productId INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unitPrice DECIMAL(10,2) NOT NULL,
  lineTotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (cartId) REFERENCES carts(id),
  FOREIGN KEY (productId) REFERENCES products(id)
);
```

#### Reviews
```sql
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  productId INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title VARCHAR(255),
  body TEXT,
  author VARCHAR(255),
  date DATETIME,
  FOREIGN KEY (productId) REFERENCES products(id)
);
```

#### Contact Requests
```sql
CREATE TABLE contact_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'reviewed', 'archived') DEFAULT 'new',
  createdAt DATETIME
);
```

## 🔗 API Endpoints

### Public Endpoints

#### Products
- `GET /api/products` - List all active products
- `GET /api/products/:id` - Get product details with images
- `GET /api/reviews/:productId` - Get reviews for a product

#### Cart
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/:id` - Get cart contents
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove cart item

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/me` - Get current user info

#### Contact
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Requires Authentication)

#### Product Management
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `POST /api/admin/products/:id/images` - Upload product images

#### Contact Management
- `GET /api/admin/contacts` - List contact requests
- `PUT /api/admin/contacts/:id` - Update contact request status

### Example API Usage

```bash
# Get all products
curl http://localhost:4000/api/products

# Get product details
curl http://localhost:4000/api/products/1

# Login (returns JWT token)
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"adminpass123"}'

# Create product (admin only)
curl -X POST http://localhost:4000/api/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"modelName":"Nike Air Max","description":"Comfortable running shoes","price":129.99,"rating":4.5}'
```

## 🎨 Frontend Pages

### Customer Pages
- **Home** (`/`) - Landing page with hero carousel and featured products
- **Products** (`/products`) - Product catalog with search and filtering
- **Product Detail** (`/products/:id`) - Detailed product view with gallery
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order review and confirmation
- **Login/Signup** (`/login`, `/signup`) - User authentication
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form

### Admin Pages
- **Admin Dashboard** (`/admin`) - Overview and metrics
- **Product Management** (`/admin/products`) - CRUD operations for products
- **Contact Management** (`/admin/contacts`) - Handle customer inquiries
- **Admin Login** (`/admin/login`) - Admin authentication

### Key Components
- **Navbar** - Responsive navigation with auth status
- **ProductCard** - Reusable product display component
- **Carousel** - Image carousel for homepage and product details
- **ImageGallery** - Multi-image viewer with thumbnails
- **ProductDetailActions** - Add to cart and buy now buttons

## 🧪 Testing

### Backend Testing
```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test tests/contract/products.test.js
```

### Frontend Testing
```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- --testNamePattern="Product Detail"
```

### Test Structure
- **Contract Tests** - API endpoint validation
- **Integration Tests** - End-to-end user flows
- **Unit Tests** - Individual component testing

## 🐳 Docker Setup

### MySQL Database
The project includes a Docker Compose configuration for MySQL:

```yaml
# docker-compose.yml
services:
  mysql:
    image: mysql:8.0
    container_name: mysql_shoes
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: shoesdb
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppass
    ports:
      - "3307:3306"
    volumes:
      - mysql_data:/var/lib/mysql
```

### Commands
```bash
# Start MySQL
docker-compose up -d mysql

# Stop MySQL
docker-compose down

# View logs
docker-compose logs mysql

# Access MySQL shell
docker exec -it mysql_shoes mysql -u appuser -p shoesdb
```

## 🔧 Development

### Backend Development
```bash
cd backend

# Development with auto-reload
npm run dev

# Manual start
npm start

# Linting
npm run lint

# Database reset (warning: destructive)
# Delete docker volume and restart
docker-compose down -v
docker-compose up -d mysql
npm run dev  # Will resync and reseed
```

### Frontend Development
```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

#### Backend (.env)
```bash
PORT=4000
DATABASE_URL=mysql://appuser:apppass@localhost:3307/shoesdb
JWT_SECRET=your-secret-key-here
BCRYPT_SALT_ROUNDS=11
```

#### Frontend (.env)
```bash
VITE_API_BASE=http://localhost:4000/api
```

### Code Style
- **ESLint** configured for both frontend and backend
- **Prettier** integration recommended
- **Conventional Commits** for git messages

## 📦 Deployment

### Production Build

#### Backend
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

#### Frontend
```bash
cd frontend
npm run build
# Deploy dist/ folder to your static hosting service
```

### Environment Considerations
- Set strong `JWT_SECRET` in production
- Use environment-specific database URLs
- Configure CORS for production domains
- Enable HTTPS in production
- Set up database backups
- Configure logging and monitoring

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Railway, Heroku, or AWS EC2
- **Database**: AWS RDS, PlanetScale, or managed MySQL

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add tests for new features
- Update documentation as needed
- Use semantic commit messages
- Keep PRs focused and atomic

### Project Roadmap
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Product search and filtering
- [ ] User profile management
- [ ] Order history tracking
- [ ] Email notifications
- [ ] Inventory management
- [ ] Multi-category support
- [ ] Wishlist functionality

---

## 📞 Support

For questions or issues, please:
1. Check existing [Issues](../../issues)
2. Create a new issue with detailed description
3. Use the contact form in the application
4. Email: support@shoesstore.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React, Node.js, and MySQL**