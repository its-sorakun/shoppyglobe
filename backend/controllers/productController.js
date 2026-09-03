// backend/controllers/productController.js: Handles the business logic for the product catalog.
// Exposes read-only queries to fetch lists of products or individual product details.

import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    // Fetch all documents in the Product collection.
    // A lean() query could be used here for performance, but we return full Mongoose documents 
    // to allow for potential virtual fields or formatting later.
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products from the database.' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    // If the provided ID is not a valid 24-character MongoDB hex string, findById will throw a CastError.
    // Catching it prevents an unhandled promise rejection.
    res.status(500).json({ error: 'Invalid product ID format or server error.' });
  }
};
