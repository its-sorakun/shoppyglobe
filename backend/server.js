// backend/server.js: Primary entry point for the Node.js backend application.
// Bootstraps the Express server, establishes database connections, and registers all middleware/routes.

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import route definitions (with explicit .js extension required for ES Modules in Node)
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

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
// Authentication endpoints are mounted directly at the root.
app.use('/', authRoutes);

// Mount core domain routes to their respective base paths.
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
