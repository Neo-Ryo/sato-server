import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export class CustomError extends Error {
    statusCode: number
    constructor(statusCode: number, message: string) {
        super(message)
        this.name = 'CustomError'
        this.statusCode = statusCode
    }
}

export const errorHandler = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
            return res.status(409).json({ message: 'Entity already exists' })
        }
    }
    if (error instanceof ZodError) {
        return res.status(406).json(error.errors)
    }
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Internal error' })
}
