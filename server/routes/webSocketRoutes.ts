import { Router } from 'express';
import WebSocketController from '../controller/WebSocketController';



const webSocketController = new WebSocketController();
const router = Router();
router.ws('/connection', (ws, req) => {
  webSocketController.handleConnection(ws);
});

export default router;
