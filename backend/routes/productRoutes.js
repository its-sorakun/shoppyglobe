// backend/routes/productRoutes.js: Defines the Express router for the product catalog endpoints.
// Exposes the public endpoints needed to browse available inventory.

const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Retrieve all products. No authentication required to browse.
router.get('/', productController.getProducts);

// Retrieve a single product by its MongoDB ObjectId.
router.get('/:id', productController.getProductById);

module.exports = router;
