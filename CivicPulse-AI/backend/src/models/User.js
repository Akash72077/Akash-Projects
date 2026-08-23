import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  full_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['citizen', 'authority', 'contractor'], default: 'citizen' },
  department: { type: String, default: null }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schema.set('toJSON', { transform: (_doc, ret) => { ret.id = ret._id.toString(); delete ret._id; delete ret.__v; delete ret.password_hash; } });
export default mongoose.models.User || mongoose.model('User', schema);
