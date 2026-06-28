import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ Please define MONGODB_URI environment variable');
}

console.log('🔍 MONGODB_URI found:', MONGODB_URI.substring(0, 30) + '...');

// Global cache for MongoDB connection
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  console.log('🔌 connectDB() called');
  
  if (cached.conn) {
    console.log('✅ Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('🆕 Creating new connection...');
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB Connected Successfully!');
        return mongoose;
      })
      .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
