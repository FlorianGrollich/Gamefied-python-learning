import {NextFunction, Request, Response} from 'express'
import {PostgresDataSource} from '../utils/data-source'
import {User} from '../entity/User'
import * as bcrypt from 'bcrypt'

import * as jwt from "jsonwebtoken";


class UserController {

    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    private get userRepository() {
        try {
            const repository = PostgresDataSource.getRepository(User);
            console.log('User repository:', repository);
            return repository;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }


    async register(req: Request, res: Response, next: NextFunction) {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const userUsername = await this.userRepository.findOne({
            where: [
                {username: username},
            ]
        });
        const userEmail = await this.userRepository.findOne({
            where: [
                {email: email},
            ]
        });
        if(userEmail !== null) {
            res.status(400).send('Email already exists');
            return;
        }
        if(userUsername !== null) {
            res.status(400).send('Username already exists');
            return;
        }


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
            console.error(err);
            res.status(500).send(`Error during user registration. Please try again later.`, );
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