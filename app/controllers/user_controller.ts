import { NextFunction, Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'
// project files
import { prisma } from '#prisma/prisma'
import { signinSchema } from '#validators/user_validator'

export default class UserController {
    async signup(request: Request, response: Response, next: NextFunction) {
        try {
            const { email, password } = signinSchema.parse(request.body)
            const user = await prisma.user.signUp(email, password)
            response.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
}
