// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Check for the Authorization header and extract the token
  const token = req.header('Authorization')?.split(' ')[1];

  // If no token is provided, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user information to the request object
    req.user.userId = decoded.id; 
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If the token is invalid, return 400 Bad Request
    return res.status(400).json({ message: 'Invalid token' });
  }
};
// app.use((req, res, next) => {
//   console.log(`${req.method} request for '${req.url}'`);
//   next();
// });

