// backend/models/User.js: Defines the MongoDB schema and model for application users.
// Establishes the structure for authentication credentials stored in the database.

import mongoose from 'mongoose';

// Defining the schema separates the logical structure of a user document from the actual database records.
// Mongoose enforces these types and constraints before allowing a write to the database engine.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Creates a MongoDB index ensuring no two documents can have the same email.
    lowercase: true, // Normalizes data before saving to prevent case-sensitivity login issues.
    trim: true // Strips accidental whitespace that could break exact-match authentication lookups.
  },
  password: {
    type: String,
    required: true
    // Note: The raw password is never stored here. Controllers must hash the password via bcrypt 
    // before instantiating this model to prevent plaintext credential exposure in the database.
  }
}, {
  // Automatically manages 'createdAt' and 'updatedAt' timestamps via MongoDB's native ISODate.
  timestamps: true 
});

export default mongoose.model('User', userSchema);
