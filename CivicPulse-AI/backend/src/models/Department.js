import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: { type: String, unique: true }, contact_email: String }, { timestamps: true });
export default mongoose.models.Department || mongoose.model('Department', schema);
