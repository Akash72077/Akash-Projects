import express from 'express';
import { getOverview, getDepartmentStats } from '../controllers/analyticsController.js';
import { Department } from '../models/Department.js';
import { Contractor } from '../models/Contractor.js';

const router = express.Router();

router.get('/overview', getOverview);
router.get('/departments', getDepartmentStats);

// Departments list
router.get('/dept-list', async (req, res, next) => {
  try {
    const departments = await Department.find();
    res.json({ success: true, data: departments });
  } catch (err) {
    next(err);
  }
});

// Contractor DLP leaderboard
router.get('/contractors', async (req, res, next) => {
  try {
    const contractors = await Contractor.find().sort({ rating: -1 });
    res.json({ success: true, data: contractors });
  } catch (err) {
    next(err);
  }
});

export default router;
