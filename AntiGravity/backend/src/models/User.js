import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { applyIdTransform } from '../utils/serialize.js';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      enum: ['CITIZEN', 'OFFICER', 'CONTRACTOR', 'ADMIN'],
      default: 'CITIZEN',
    },
    reputationScore: {
      type: Number,
      default: 100,
    },
    ward: {
      type: String,
      default: 'Ward 104 - Kondapur / Madhapur',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

applyIdTransform(UserSchema, { strip: ['password'] });

// Hash password prior to saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, email: this.email, name: this.name },
    process.env.JWT_SECRET || 'civic_verify_hackathon_super_secret_jwt_key_2026',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

export const User = mongoose.model('User', UserSchema);
export default User;
