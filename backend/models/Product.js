// backend/models/Product.js: Defines the MongoDB schema and model for the e-commerce product catalog.
// Structures how individual items for sale are represented in the database.

const mongoose = require('mongoose');

// The product schema dictates the exact fields required for the catalog.
// Enforcing numerical constraints (min: 0) directly at the schema layer prevents 
// business logic bugs where products could theoretically have negative prices or stock.
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Prevents insertion of negative price values into the collection.
  },
  description: {
    type: String,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0 // Falls back to zero if unspecified, guarding against undefined math operations later.
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
