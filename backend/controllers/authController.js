// backend/controllers/authController.js: Handles the business logic for user authentication.
// Processes registration and login requests, securely hashes passwords, and issues JWTs.

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if the user already exists to prevent duplicate key errors from MongoDB crashing the process.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // Hash the password using a work factor of 10.
    // This deliberately slows down the computation to thwart brute-force attacks on the database.
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Look up the user by email.
    const user = await User.findOne({ email });
    if (!user) {
      // Intentionally vague error message to prevent email enumeration attacks.
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Cryptographically compare the provided plaintext password against the stored bcrypt hash.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Sign a JSON Web Token containing the user's ID as the payload.
    // This token allows the client to authenticate subsequent requests statelessly.
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login.' });
  }
};
