import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';
export async function connectMongo() {
  try {

    await mongoose.connect('mongodb://localhost:27017/banana');
    console.log('Connected to MongoDB');
  } catch (err) {
    Sentry.captureException(err);
    console.error('MongoDB connection error: ', err);
  }
}