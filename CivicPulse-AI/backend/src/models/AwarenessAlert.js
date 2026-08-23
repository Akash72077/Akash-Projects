import mongoose from 'mongoose';
const schema = new mongoose.Schema({ title: String, message: String, severity: String, active: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.models.AwarenessAlert || mongoose.model('AwarenessAlert', schema);
