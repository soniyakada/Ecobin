import dotenv from 'dotenv';
dotenv.config(); 

import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI;


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
  
  }
};

export default connectDB;

