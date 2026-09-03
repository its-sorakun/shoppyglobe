// backend/routes/authRoutes.js: Defines the Express router for authentication endpoints.
// Maps external HTTP POST requests to the appropriate internal controller logic.

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Route for creating a new user account.
router.post('/register', authController.register);

// Route for authenticating an existing user and issuing a JWT.
router.post('/login', authController.login);

module.exports = router;
