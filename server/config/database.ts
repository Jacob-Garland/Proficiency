import mongoose from 'mongoose';
import config from './index.js'

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB Connected Successfully 🚀');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error);
    process.exit(1);
  }
};

export default connectDB;