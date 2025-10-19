
const jwt = require('jsonwebtoken');
const User = require("../models/User");
require('dotenv').config();

const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // optional chaining for safety
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    req.user = user; // attach user to request object
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = auth;
