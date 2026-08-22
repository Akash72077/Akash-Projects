import mongoose from 'mongoose';
import { applyIdTransform } from '../utils/serialize.js';

const InfrastructureSchema = new mongoose.Schema(
  {
    assetId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please add an infrastructure asset name'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['ROAD', 'WATER_PIPE', 'DRAIN', 'STREETLIGHT', 'ELECTRICAL'],
      required: true,
    },
    contractorId: {
      type: String,
      required: true,
    },
    contractorName: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      default: '2024-01-15',
    },
    completionDate: {
      type: String,
      default: '2024-11-20',
    },
    warrantyExpiry: {
      type: String,
      required: true, // Defect Liability Period (DLP)
      default: '2027-11-20',
    },
    isUnderWarranty: {
      type: Boolean,
      default: true,
    },
    projectCost: {
      type: String,
      default: '₹ 1.85 Cr',
    },
    ward: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

applyIdTransform(InfrastructureSchema, { publicIdField: 'assetId' });

export const Infrastructure = mongoose.model('Infrastructure', InfrastructureSchema);
export default Infrastructure;
