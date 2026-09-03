// backend/routes/cartRoutes.js: Defines the Express router for shopping cart endpoints.
// Protects all cart mutations behind the authMiddleware, ensuring only verified users can modify their carts.

const express = require('express');
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Enforce JWT validation on all routes registered below this line.
// Requests without a valid token will be rejected before reaching the controller.
router.use(authMiddleware);

// Add a product to the authenticated user's cart.
router.post('/', cartController.addToCart);

// Update the quantity of a specific product in the cart.
router.put('/:id', cartController.updateCartItem);

// Remove a specific product from the cart entirely.
router.delete('/:id', cartController.removeFromCart);

module.exports = router;
