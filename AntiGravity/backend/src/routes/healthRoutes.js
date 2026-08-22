import express from 'express';
import { getActiveAlerts, createBroadcastAlert } from '../services/notificationService.js';
import { getDBStatus } from '../config/database.js';
import { Department } from '../models/Department.js';
import { Infrastructure } from '../models/Infrastructure.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  const db = getDBStatus();
  res.json({
    success: true,
    message: 'CivicVerify API is running',
    database: db,
    timestamp: new Date().toISOString(),
    version: '2.0.0',
  });
});

// Awareness alerts
router.get('/alerts', async (req, res, next) => {
  try {
    const { ward } = req.query;
    const alerts = await getActiveAlerts(ward || 'ALL');
    res.json({ success: true, count: alerts.length, data: alerts });
  } catch (err) {
    next(err);
  }
});

router.post('/alerts', async (req, res, next) => {
  try {
    const alert = await createBroadcastAlert(req.body);
    res.status(201).json({ success: true, data: alert });
  } catch (err) {
    next(err);
  }
});

// Departments list (also available here for convenience)
router.get('/departments', async (req, res, next) => {
  try {
    const departments = await Department.find();
    res.json({ success: true, data: departments });
  } catch (err) {
    next(err);
  }
});

router.get('/infrastructure', async (req, res, next) => {
  try {
    const assets = await Infrastructure.find();
    res.json({ success: true, count: assets.length, data: assets });
  } catch (err) {
    next(err);
  }
});

export default router;
