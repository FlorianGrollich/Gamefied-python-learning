import {Router} from 'express';
import UserController from "../controller/UserController";
import SessionController from '../controller/SessionController';

const router = Router();

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/createSession', SessionController.createSession)

export default router;