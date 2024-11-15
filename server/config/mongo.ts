import mongoose from 'mongoose';
import * as Sentry from '@sentry/node';

export async function connectMongo() {
  try {

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING!);
  } catch (err) {
    Sentry.captureException(err);
    console.error('MongoDB connection error: ', err);
  }
}