import {NextFunction, Request, Response} from 'express'
import {PostgresDataSource} from '../utils/data-source'
import {User} from '../entity/User'
import * as bcrypt from 'bcrypt'

import * as jwt from "jsonwebtoken";


class UserController {
    private userRepository = PostgresDataSource.getRepository(User)


    async register(req: Request, res: Response, next: NextFunction) {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        try {
            const user = this.userRepository.create({
                username,
                email,
                hashedPassword
            })

            await this.userRepository.save(user);

            const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!, {expiresIn: '1h'});
            res.json({token});
        } catch (err) {
            res.status(500).send('Error during user registration. Please try again later.');
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const {usernameOrEmail, password} = req.body;
        const user = await this.userRepository.findOne({
            where: [
                {username: usernameOrEmail},
                {email: usernameOrEmail}
            ]
        });

        if (user === null || !await bcrypt.compare(password, user.hashedPassword)) {
            res.status(401).send('Credentials are incorrect');
            return;
        }

        const token = jwt.sign({userId: user.id}, 'yourSecretKey', {expiresIn: '1h'});
        res.json({token});
    }
}

export default new UserController();