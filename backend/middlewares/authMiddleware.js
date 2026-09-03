// backend/middlewares/authMiddleware.js: Express middleware for protecting routes using JSON Web Tokens.
// Intercepts incoming requests to verify the client's identity before allowing them to hit protected controller logic.

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // The standard HTTP specification expects tokens in the format: 'Bearer <token>'
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No bearer token provided in authorization header.' });
  }

  // Extract the raw token string by splitting the prefix.
  const token = authHeader.split(' ')[1];

  try {
    // Synchronously verifies the token's cryptographic signature against the server's private secret.
    // If the token was tampered with or has expired, this function will throw an error.
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user data (e.g., the user ID) directly to the request object.
    // This makes the verified identity easily accessible to the downstream route handlers.
    req.user = decodedPayload;
    
    // Pass control to the next middleware or the actual route controller.
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
