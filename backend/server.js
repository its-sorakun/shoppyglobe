// backend/server.js: Primary entry point for the Node.js backend application.
// Bootstraps the Express server, establishes database connections, and registers all middleware/routes.

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import route definitions
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Standard middleware setup
// CORS allows the frontend (likely running on a different port like 5173) to communicate with this backend.
app.use(cors());
// express.json() parses incoming requests with JSON payloads, replacing the older body-parser module.
app.use(express.json());

// Database connection
// Connects to MongoDB using the URI from environment variables.
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connection established successfully.'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Route mounting
// Prefixing routes helps version and organize the API surface area.
app.use('/register', (req, res, next) => {
    // Note: The PDF requires POST /register and POST /login directly at the root, 
    // but standard practice is /api/auth. However, to strictly follow the PDF paths:
    req.url = '/register'; 
    next();
}, authRoutes);
app.use('/login', (req, res, next) => {
    req.url = '/login';
    next();
}, authRoutes);

// Mounting exactly as requested by the PDF
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Global fallback for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server executing on port ${PORT}`);
});
