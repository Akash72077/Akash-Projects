import { User } from '../models/User.js';
import { Complaint } from '../models/Complaint.js';

// @desc    Get user profile with civic reputation and complaints
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const complaintsCount = await Complaint.countDocuments({
      $or: [{ citizen: user._id }, { citizenId: user.id }, { 'timeline.actorName': user.name }],
    });

    const closedCount = await Complaint.countDocuments({
      status: 'CLOSED',
      $or: [{ citizen: user._id }, { citizenId: user.id }],
    });

    res.status(200).json({
      success: true,
      data: {
        user,
        stats: {
          totalComplaints: complaintsCount,
          resolvedComplaints: closedCount,
          reputationScore: user.reputationScore,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all users (Admin/Officer)
// @route   GET /api/users
// @access  Private (Admin)
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};
