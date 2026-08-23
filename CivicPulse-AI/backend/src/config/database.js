import mongoose from 'mongoose';

let mongoConnected = false;

export async function connectDatabase() {
  const uri = process.env.MONGO_URI?.trim();
  if (!uri) {
    console.log('ℹ MongoDB not configured. Using built-in demo memory store.');
    return false;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 7000 });
    mongoConnected = true;
    console.log('✓ MongoDB connected');
    return true;
  } catch (error) {
    mongoConnected = false;
    console.warn('⚠ MongoDB connection failed; continuing in demo memory mode.');
    console.warn(error.message);
    return false;
  }
}

export function isMongoConnected() {
  return mongoConnected && mongoose.connection.readyState === 1;
}
