import { createClient } from 'redis';
import * as Sentry from '@sentry/node';

const redisclient = createClient();

redisclient.on('error', (err) => {
  Sentry.captureException(err);
});

redisclient.connect();

export default redisclient;