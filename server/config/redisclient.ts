import {createClient} from 'redis';

const redisclient = createClient();

redisclient.on('error', (err) => {
  console.error('Error ' + err.toString());
});

redisclient.connect();

export default redisclient;