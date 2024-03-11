import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

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
    return res.status(500).json({ message: 'Internal error' })
}
