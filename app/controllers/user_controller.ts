import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
// project files
import {envs} from "#env"
import { prisma } from '#prisma/prisma'
import { signinSchema } from '#validators/user_validator'
import { CustomError } from '#exceptions/handler'
import { emailHandler } from "#mails/handler"
import { valitationEmailTemplate } from "#mails/handleEmailTemplates" 

export default class UserController {
    async signup(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = signinSchema.parse(request.body)
            const hash = await bcrypt.hash(password, 10)
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hash,
                },
                select: {
                    password: false,
                    accessToken: false,
                    email: true,
                    id: true,
                    username: true,
                },
            })
            emailHandler.sendEmail(envs.MAIL_USER, user.email, "Email confirmation","", valitationEmailTemplate('www.google.com'))
            response.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    async signin(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = signinSchema.parse(request.body)
            const user = await prisma.user.findUnique({
                where: { email },
            })
            if (!user) {
                throw new CustomError(404, 'User not found')
            }
            if (!bcrypt.compareSync(password, user.password)) {
                throw new CustomError(401, 'Invalid credentials')
            }
            response.status(200).json({ message: 'Succesfully logged in' })
        } catch (error) {
            next(error)
        }
    }
}
