import mongoose from 'mongoose';
const schema = new mongoose.Schema({ type: String, name: String, latitude: Number, longitude: Number, risk_level: String }, { timestamps: true });
export default mongoose.models.Infrastructure || mongoose.model('Infrastructure', schema);
