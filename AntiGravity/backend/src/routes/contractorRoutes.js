import express from 'express';
import { getContractors, getContractorAssignments } from '../controllers/contractorController.js';

const router = express.Router();

router.get('/', getContractors);
router.get('/assignments', getContractorAssignments);

export default router;
