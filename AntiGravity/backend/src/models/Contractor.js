import mongoose from 'mongoose';
import { applyIdTransform } from '../utils/serialize.js';

const ContractorSchema = new mongoose.Schema(
  {
    contractorId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a contact name'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Please add a contractor company name'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1.0,
      max: 5.0,
    },
    departmentId: {
      type: String,
      required: true,
    },
    activeProjectsCount: {
      type: Number,
      default: 0,
    },
    totalResolvedCount: {
      type: Number,
      default: 0,
    },
    slaCompliancePercentage: {
      type: Number,
      default: 95.0,
    },
  },
  {
    timestamps: true,
  }
);

applyIdTransform(ContractorSchema, { publicIdField: 'contractorId' });

export const Contractor = mongoose.model('Contractor', ContractorSchema);
export default Contractor;
