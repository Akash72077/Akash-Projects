import mongoose from 'mongoose';
import { applyIdTransform } from '../utils/serialize.js';

const AwarenessAlertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add an alert title'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please add alert message content'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['WARNING', 'INFO', 'CRITICAL', 'SUCCESS'],
      default: 'INFO',
    },
    ward: {
      type: String,
      required: true,
      default: 'All Municipal Wards',
    },
    issuedBy: {
      type: String,
      required: true,
      default: 'Municipal Zonal Authority',
    },
    relatedCategory: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

applyIdTransform(AwarenessAlertSchema);

export const AwarenessAlert = mongoose.model('AwarenessAlert', AwarenessAlertSchema);
export default AwarenessAlert;
