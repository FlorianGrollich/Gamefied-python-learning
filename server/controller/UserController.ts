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

    async register(request: Request, response: Response, next: NextFunction) {
        const {username, email, password, passwordConfirmation} = request.body
        // Validate Username, Email, and Password
        const {errors: usernameErrors, isValid: isUsernameValid} =
            validateUsername(username)
        const {errors: emailErrors, isValid: isEmailValid} =
            validateEmailInput(email)
        const {errors: passwordErrors, isValid: isPasswordValid} =
            validatePasswordInput(password)

        if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
            return response.status(400).json({
                username: usernameErrors,
                email: emailErrors,
                password: passwordErrors,
            })
        }

        if (password !== passwordConfirmation) {
            return response.status(400).json({error: 'Passwords do not match'})
        }

        const existingUser = await this.userRepository.findOne({where: {email}})
        if (existingUser) {
            return response
                .status(400)
                .json({error: 'User with the provided email already exists'})
        }

        const user = new User()
        user.username = username
        user.email = email
        user.setPassword(password)

        await this.userRepository.save(user)

        const token = generateToken(user.id, user.email)

        return response
            .status(201)
            .json({token: token, message: 'User registered successfully'})
    }

    async all(request: Request, response: Response, next: NextFunction) {
        const users = await this.userRepository.find()
        return response.json(users)
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        const user = await this.userRepository.findOneBy({id: parseInt(id)})
        if (!user) {
            return response.status(404).json({error: 'User not found'})
        }
        return response.json(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        let userToRemove = await this.userRepository.findOneBy({id: parseInt(id)})
        if (!userToRemove) {
            return response.status(404).json({error: 'User not found'})
        }

        await this.userRepository.remove(userToRemove)
        return response.status(200).json({message: 'User removed successfully'})
    }

    async login(request: Request, response: Response) {
        try {
            const {email, password} = request.body

            const {errors: emailErrors, isValid: isEmailValid} =
                validateEmailInput(email)
            const {errors: passwordErrors, isValid: isPasswordValid} =
                validatePasswordInput(password)
            if (!isEmailValid || !isPasswordValid) {
                return response
                    .status(400)
                    .json({email: emailErrors, password: passwordErrors})
            }

            const user = await this.userRepository.findOne({where: {email}})
            if (!user || !user.validatePassword(password)) {
                return response.status(401).json({error: 'Invalid email or password'})
            }

            const JWT_SECRET = process.env.JWT_SECRET
            if (!JWT_SECRET) {
                console.error('JWT_SECRET is not set')
                return response.status(500).json({error: 'Internal server error'})
            }

            const token = jwt.sign(
                {userId: user.id, email: user.email},
                JWT_SECRET,
                {expiresIn: '24h'},
            )

            return response.json({
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
                token,
            })
        } catch (error) {
            console.error('Login error:', error)
            return response.status(500).json({error: 'Internal server error'})
        }
    }
}

export default new UserController();