import {NextFunction, Request, Response} from 'express'
import {PostgresDataSource} from '../utils/data-source'
import {User} from '../entity/User'
import {generateToken} from '../utils/token'
import {
    validateEmailInput,
    validatePasswordInput,
    validateUsername,
} from '../utils/validation'
import * as jwt from "jsonwebtoken";


class UserController {
    private userRepository = PostgresDataSource.getRepository(User)


    async register(req: Request, res: Response, next: NextFunction) {
        const {username, email, password} = req.body
        this.userRepository.create()
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        if (isValidUser(username, password)) {
            const token = jwt.sign({ userId: user.id }, 'yourSecretKey', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Credentials are incorrect');
        }
    }
}

export default new UserController();