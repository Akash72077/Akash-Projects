import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: String, email: String, department: String, active: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.models.Contractor || mongoose.model('Contractor', schema);
