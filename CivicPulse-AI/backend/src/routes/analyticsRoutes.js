import { Router } from 'express';
import { hotspots, overview } from '../controllers/analyticsController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const r = Router();
r.get('/overview', overview);
r.get('/hotspots', requireAuth, requireRole('authority'), hotspots);
export default r;
