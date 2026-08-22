import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/civicverify';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected to database: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    console.warn(`[MongoDB] Database connection warning: ${error.message}`);
    console.warn(`[MongoDB] Note: To connect to MongoDB Atlas, set MONGO_URI in backend/.env`);
    // Do not crash the entire process so offline mode & health check still run gracefully
  }
};

export const getDBStatus = () => {
  const states = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };
  return {
    state: states[mongoose.connection.readyState] || 'Unknown',
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
  };
};
