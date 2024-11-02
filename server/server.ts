import dotenv from 'dotenv';
import { createServer } from 'http';
import { PORT } from './config';
import { setupMiddleware } from './middleware';
import { connectMongo } from './config/mongo';
import { verifyEnvVar } from './config/env';
import app from './config/app';

dotenv.config();

verifyEnvVar();
connectMongo();


setupMiddleware(app);


const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
