// backend/routes/authRoutes.js: Defines the Express router for authentication endpoints.
// Maps external HTTP POST requests to the appropriate internal controller logic.

import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Route for creating a new user account.
router.post('/register', authController.register);

// Route for authenticating an existing user and issuing a JWT.
router.post('/login', authController.login);

export default router;
