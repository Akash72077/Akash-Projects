import jwt from 'jsonwebtoken';
import { findUserById } from '../data/repository.js';

const secret = () => process.env.JWT_SECRET || 'civicpulse-demo-secret-change-me';

export function createToken(user) {
  const id = user.id || user._id?.toString();
  return jwt.sign({ id, role: user.role }, secret(), { expiresIn: '7d' });
}

export async function optionalAuth(req, _res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return next();
  try {
    const payload = jwt.verify(token, secret());
    req.user = await findUserById(payload.id);
  } catch { /* ignore invalid optional token */ }
  next();
}

export async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ message: 'Authentication required.' });
  try {
    const payload = jwt.verify(token, secret());
    const user = await findUserById(payload.id);
    if (!user) return res.status(401).json({ message: 'User not found.' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired session.' });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ message: 'Not authorized for this action.' });
}
