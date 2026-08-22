import { User } from '../models/User.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role, ward } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'CITIZEN',
      ward: ward || 'Ward 104 - Kondapur / Madhapur',
      reputationScore: 100,
    });

    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ward: user.ward,
        reputationScore: user.reputationScore,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both an email and password',
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ward: user.ward,
        reputationScore: user.reputationScore,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(200).json({
        success: true,
        data: req.user,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ward: user.ward,
        reputationScore: user.reputationScore,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Switch demo role perspective
// @route   POST /api/auth/perspective
// @access  Public
export const switchPerspective = async (req, res, next) => {
  try {
    const { role } = req.body;
    const targetRole = (role || 'CITIZEN').toUpperCase();

    // Look for existing user with target role
    let user = await User.findOne({ role: targetRole });
    if (!user) {
      // Create user if not present
      const defaultNames = {
        CITIZEN: 'Aarav Sharma',
        OFFICER: 'Er. Rajesh Varma (Executive Engineer)',
        CONTRACTOR: 'Vikram Reddy (Deccan Infra Ltd)',
        ADMIN: 'Chief Municipal Admin',
      };
      user = await User.create({
        name: defaultNames[targetRole] || `${targetRole} User`,
        email: `${targetRole.toLowerCase()}@civicverify.org`,
        password: 'Password@123',
        role: targetRole,
        ward: 'Ward 104 - Kondapur / Madhapur',
        reputationScore: targetRole === 'CITIZEN' ? 140 : 200,
      });
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      message: `Perspective switched to ${user.name} (${user.role})`,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ward: user.ward,
        reputationScore: user.reputationScore,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
