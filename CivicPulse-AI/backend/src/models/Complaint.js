import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user_id: { type: String, required: true },
  reporter_name: { type: String, default: 'Citizen' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  priority_score: { type: Number, min: 0, max: 100, default: 50 },
  suggested_department: { type: String, default: 'General Municipal Services' },
  ai_summary: { type: String, default: '' },
  status: { type: String, enum: ['reported', 'verified', 'assigned', 'in_progress', 'resolved'], default: 'reported' },
  assigned_to: { type: String, default: null },
  photo_url: { type: String, default: null },
  after_repair_photo_url: { type: String, default: null },
  latitude: { type: Number, default: null },
  longitude: { type: Number, default: null },
  location_text: { type: String, default: null },
  area: { type: String, default: 'Other Area', index: true },
  duplicate_of: { type: String, default: null },
  supporters: { type: [String], default: [] }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schema.set('toJSON', { transform: (_doc, ret) => {
  ret.id = ret._id.toString();
  ret.supporter_count = ret.supporters?.length || 0;
  ret.profiles = { id: ret.user_id, full_name: ret.reporter_name, role: 'citizen', department: null, created_at: ret.created_at };
  delete ret._id;
  delete ret.__v;
} });
export default mongoose.models.Complaint || mongoose.model('Complaint', schema);
