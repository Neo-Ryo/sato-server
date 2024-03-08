import { Request, Response } from 'express'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'
// project files
import { prisma } from '#prisma/prisma'
import { signinSchema } from '#validators/user_validator'

export default class UserController {
    async signup(request: Request, response: Response) {
        try {
            const { email, password } = signinSchema.parse(request.body)
            const user = await prisma.user.signUp(email, password)
            response.status(200).json(user)
        } catch (error) {
            console.log(error)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return response
                        .status(409)
                        .json({ message: 'Entity user already exists' })
                }
            }
            if (error instanceof ZodError) {
                return response.status(404).json(error.errors)
            }
            return response.status(500).json('Internal error')
        }
    }
}
