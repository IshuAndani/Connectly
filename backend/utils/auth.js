// utils/auth.js
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// Middleware to verify the JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret key
    req.user = decoded; // Add the decoded payload (e.g., user ID) to the request object
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { generateToken , authenticateToken};
