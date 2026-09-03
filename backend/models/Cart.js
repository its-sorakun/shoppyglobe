// backend/models/Cart.js: Defines the MongoDB schema and model for user shopping carts.
// Establishes relational references between specific users and their selected products.

import mongoose from 'mongoose';

// The cart schema embeds an array of item subdocuments. 
// This denormalization approach is optimal for MongoDB, keeping the cart payload 
// localized in a single document rather than requiring complex multi-table joins on every read.
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Creates a reference to the User collection, allowing Mongoose to populate user data if needed.
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // References the Product collection. Crucial for pulling current price/details during checkout.
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // A cart item mathematically cannot exist with a quantity less than 1.
        default: 1
      }
    }
  ]
}, {
  timestamps: true
});

export default mongoose.model('Cart', cartSchema);
