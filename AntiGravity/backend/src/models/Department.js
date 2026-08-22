import mongoose from 'mongoose';
import { applyIdTransform } from '../utils/serialize.js';

const DepartmentSchema = new mongoose.Schema(
  {
    departmentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a department name'],
      trim: true,
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    slaHours: {
      type: Number,
      required: true,
      default: 48,
    },
    headName: {
      type: String,
      default: 'Executive Engineer',
    },
    headEmail: {
      type: String,
      default: 'officer@civicverify.gov.in',
    },
    color: {
      type: String,
      default: '#3B82F6',
    },
    iconName: {
      type: String,
      default: 'Building2',
    },
    keywords: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

applyIdTransform(DepartmentSchema, { publicIdField: 'departmentId' });

export const Department = mongoose.model('Department', DepartmentSchema);
export default Department;
