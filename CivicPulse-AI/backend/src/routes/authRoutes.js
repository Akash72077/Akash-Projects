import { Router } from 'express';
import { login, me, register } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
const r = Router();
r.post('/register', register); r.post('/login', login); r.get('/me', requireAuth, me);
export default r;
