import { Contractor } from '../models/Contractor.js';
import { Complaint } from '../models/Complaint.js';

// @desc    Get all registered contractors
// @route   GET /api/contractors
// @access  Public
export const getContractors = async (req, res, next) => {
  try {
    const contractors = await Contractor.find().sort({ rating: -1 });
    res.status(200).json({
      success: true,
      count: contractors.length,
      data: contractors,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get assigned work orders for contractor
// @route   GET /api/contractors/assignments
// @access  Public / Private
export const getContractorAssignments = async (req, res, next) => {
  try {
    const { contractorId } = req.query;
    const query = { status: { $nin: ['CLOSED', 'REJECTED'] } };

    if (contractorId) {
      query.contractorId = contractorId;
    }

    const assignments = await Complaint.find(query).sort({ priority: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments,
    });
  } catch (err) {
    next(err);
  }
};
