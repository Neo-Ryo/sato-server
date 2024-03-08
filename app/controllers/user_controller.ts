import { Request, Response } from 'express'
import { signinSchema } from '#validators/user_validator'
import bcrypt from 'bcryptjs'

export default class UserController {
    async signin(request: Request, response: Response) {
        try {
            const payload = signinSchema.parse(request.body)
            console.log(payload)

            response.status(200).json('ok')
        } catch (error) {
            response.status(500).json('Internal error')
        }
    }
}
