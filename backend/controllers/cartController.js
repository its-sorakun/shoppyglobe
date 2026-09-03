// backend/controllers/cartController.js: Handles the business logic for shopping carts.
// Ensures data consistency when users mutate their carts, guarding against invalid product selections.

const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId; // Extracted safely from the authMiddleware.

    // Validate that the product actually exists in the database before allowing it in a cart.
    // This prevents orphan records and checkout crashes later.
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product does not exist.' });
    }

    // Locate the user's existing cart, or create a new one if it doesn't exist.
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: quantity || 1 }] });
    } else {
      // Check if the exact product is already in the cart's items array.
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      
      if (itemIndex > -1) {
        // Increment the existing item's quantity rather than duplicating the row.
        cart.items[itemIndex].quantity += (quantity || 1);
      } else {
        // Push the new product as a subdocument into the items array.
        cart.items.push({ productId, quantity: quantity || 1 });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart.' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.userId;

    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1. Use the DELETE endpoint to remove items.' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in cart.' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item.' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    // Filter out the specified product ID from the subdocument array.
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart.' });
  }
};
