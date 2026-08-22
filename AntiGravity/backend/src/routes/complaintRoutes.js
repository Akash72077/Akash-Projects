import express from 'express';
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateProgress,
  confirmCitizenVerification,
  upvoteComplaint,
  clusterDuplicateReport,
  escalateComplaint,
  getMapComplaints,
} from '../controllers/complaintController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Map endpoints (no auth)
router.get('/map', getMapComplaints);

// Main complaint routes
router.get('/', getComplaints);
router.post('/', optionalAuth, upload.single('image'), createComplaint);
router.get('/:id', getComplaintById);

// Actions on specific complaint
router.patch('/:id/progress', optionalAuth, upload.single('proofImage'), updateProgress);
router.post('/:id/confirm', optionalAuth, confirmCitizenVerification);
router.post('/:id/upvote', optionalAuth, upvoteComplaint);
router.post('/:id/cluster', optionalAuth, clusterDuplicateReport);
router.post('/:id/escalate', optionalAuth, escalateComplaint);

export default router;
