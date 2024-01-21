import { Router } from 'express';
import UserController from "../controller/UserController";

const router = Router();

router.get('/', UserController.all)
router.get('/:id', UserController.one)
router.post('/register', UserController.register)
router.delete('/:id', UserController.remove)
router.post('/login', UserController.login)

export default router;