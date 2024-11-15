import { createClient } from 'redis';
import * as Sentry from '@sentry/node';

const redisclient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!),
  },
});

redisclient.on('error', (err) => {
  console.error('Redis error: ', err);
  Sentry.captureException(err);
});

redisclient.connect();

export default redisclient;