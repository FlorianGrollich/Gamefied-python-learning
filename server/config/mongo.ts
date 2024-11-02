import mongoose from 'mongoose';

export async function connectMongo() {
  try {

    await mongoose.connect('mongodb://localhost:27017/banana');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error: ', err);
  }
}