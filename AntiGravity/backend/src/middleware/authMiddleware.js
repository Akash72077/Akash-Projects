import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this resource. Please log in.',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'civic_verify_hackathon_super_secret_jwt_key_2026'
    );
    
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      // Create lightweight simulated user context if using seed token
      req.user = {
        _id: decoded.id,
        id: decoded.id,
        name: decoded.name || 'Citizen User',
        email: decoded.email || 'user@civicverify.org',
        role: decoded.role || 'CITIZEN',
        reputationScore: 120,
      };
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid token. Please log in again.',
    });
  }
};

// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role (${req.user?.role || 'NONE'}) is not authorized to access this route`,
      });
    }
    next();
  };
};

// Optional auth - populates req.user if token is provided, but doesn't block if absent
export const optionalAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'civic_verify_hackathon_super_secret_jwt_key_2026'
      );
      req.user = await User.findById(decoded.id);
    } catch (e) {
      // Ignore token failure for optional auth
    }
  }
  next();
};
