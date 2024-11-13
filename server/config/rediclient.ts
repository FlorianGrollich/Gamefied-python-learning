import {createClient} from 'redis';

const rediclient = createClient();

rediclient.on('error', (err) => {
  console.log('Error ' + err);
});

rediclient.connect();

export default rediclient;