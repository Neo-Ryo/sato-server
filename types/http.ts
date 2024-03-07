import { NextFunction, Request, Response } from 'express'

type HttpContext = {
    request: Request
    response: Response
    next: NextFunction
}

export { HttpContext }
