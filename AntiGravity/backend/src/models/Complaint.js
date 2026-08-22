import mongoose from 'mongoose';

const TimelineEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  actorRole: {
    type: String,
    enum: ['SYSTEM', 'AI', 'CITIZEN', 'OFFICER', 'CONTRACTOR', 'ADMIN'],
    default: 'SYSTEM',
  },
  actorName: {
    type: String,
    default: 'CivicVerify System',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VerificationFeedbackSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    enum: ['FIXED', 'PARTIALLY_FIXED', 'NOT_FIXED'],
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  proofImageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ComplaintSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    citizenId: {
      type: String,
      default: 'user-citizen-1',
    },
    citizenName: {
      type: String,
      default: 'Aarav Sharma',
    },
    citizenPhone: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: [true, 'Please add a grievance title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description of the defect'],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'POTHOLE',
        'WATER_LEAK',
        'GARBAGE',
        'OPEN_MANHOLE',
        'BROKEN_STREETLIGHT',
        'ELECTRICAL_HAZARD',
        'SEWAGE_OVERFLOW',
        'DRAINAGE_BLOCK',
        'ROAD_DEFECT',
      ],
      required: true,
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'MEDIUM',
    },
    status: {
      type: String,
      enum: [
        'SUBMITTED',
        'VERIFICATION_PENDING',
        'VERIFIED',
        'ASSIGNED',
        'CONTRACTOR_NOTIFIED',
        'WORK_IN_PROGRESS',
        'PARTIALLY_RESOLVED',
        'RESOLVED_PENDING_CITIZEN_CONFIRMATION',
        'CLOSED',
        'REOPENED',
        'ESCALATED',
        'REJECTED',
        'DUPLICATE',
      ],
      default: 'SUBMITTED',
    },

    // Geospatial data
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      default: 'Ward 104 - Kondapur / Madhapur',
      index: true,
    },
    zone: {
      type: String,
      default: 'Serilingampally West Zone',
    },
    locationConfidence: {
      type: String,
      enum: ['HIGH', 'MEDIUM', 'LOW', 'UNVERIFIED'],
      default: 'HIGH',
    },
    locationMethod: {
      type: String,
      enum: ['GPS_HARDWARE', 'NETWORK_APPROX', 'MANUAL_PIN', 'LANDMARK'],
      default: 'GPS_HARDWARE',
    },

    // Camera & Image Evidence
    initialImageUrl: {
      type: String,
      required: true,
    },
    progressImageUrl: {
      type: String,
    },
    resolvedImageUrl: {
      type: String,
    },
    capturedViaCamera: {
      type: Boolean,
      default: true,
    },
    captureTimestamp: {
      type: Date,
      default: Date.now,
    },
    imagePHash: {
      type: String,
    },

    // AI Classification details
    aiDetectedCategory: {
      type: String,
    },
    aiConfidence: {
      type: Number,
      default: 0.94,
    },
    aiFraudFlag: {
      type: Boolean,
      default: false,
    },
    aiVerificationNotes: {
      type: String,
    },

    // Department & Contractor
    departmentId: {
      type: String,
      index: true,
    },
    departmentName: {
      type: String,
    },
    contractorId: {
      type: String,
      index: true,
    },
    contractorName: {
      type: String,
    },
    assignedOfficerName: {
      type: String,
    },
    infrastructureId: {
      type: String,
    },
    infrastructureName: {
      type: String,
    },
    isUnderWarranty: {
      type: Boolean,
      default: false,
    },
    warrantyExpiry: {
      type: String,
    },

    // Progress & SLA Resolution
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    slaHours: {
      type: Number,
      default: 48,
    },
    slaDeadline: {
      type: Date,
    },
    isEscalated: {
      type: Boolean,
      default: false,
    },
    escalationLevel: {
      type: Number,
      default: 0,
    },
    escalationReason: {
      type: String,
    },

    // Duplicate Clustering & Citizen Upvotes
    parentComplaintId: {
      type: String,
    },
    reportCount: {
      type: Number,
      default: 1,
    },
    upvotesCount: {
      type: Number,
      default: 0,
    },
    upvotedBy: {
      type: [String],
      default: [],
    },

    // Full Audit Timeline
    timeline: [TimelineEventSchema],

    // Citizen Confirmation Signoff
    verifications: [VerificationFeedbackSchema],
    citizenRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    citizenFeedback: {
      type: String,
    },
    resolvedAt: {
      type: Date,
    },
    citizenConfirmedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const complaintTransform = (_doc, ret) => {
  ret.id = String(ret._id);
  if (Array.isArray(ret.timeline)) {
    ret.timeline = ret.timeline.map((event) => ({
      ...event,
      id: event.id || (event._id ? String(event._id) : undefined),
      complaintId: event.complaintId || String(ret._id),
      createdAt: event.createdAt ? new Date(event.createdAt).toISOString() : event.createdAt,
    }));
  }
  if (Array.isArray(ret.verifications)) {
    ret.verifications = ret.verifications.map((v) => ({
      ...v,
      id: v.id || (v._id ? String(v._id) : undefined),
      complaintId: v.complaintId || String(ret._id),
      createdAt: v.createdAt ? new Date(v.createdAt).toISOString() : v.createdAt,
    }));
  }
  if (ret.slaDeadline) ret.slaDeadline = new Date(ret.slaDeadline).toISOString();
  if (ret.createdAt) ret.createdAt = new Date(ret.createdAt).toISOString();
  if (ret.updatedAt) ret.updatedAt = new Date(ret.updatedAt).toISOString();
  if (ret.captureTimestamp) ret.captureTimestamp = new Date(ret.captureTimestamp).toISOString();
  delete ret.__v;
  return ret;
};

ComplaintSchema.set('toJSON', { virtuals: true, transform: complaintTransform });
ComplaintSchema.set('toObject', { virtuals: true, transform: complaintTransform });

// Geo compound index
ComplaintSchema.index({ latitude: 1, longitude: 1 });
ComplaintSchema.index({ status: 1, priority: 1, category: 1 });

export const Complaint = mongoose.model('Complaint', ComplaintSchema);
export default Complaint;
