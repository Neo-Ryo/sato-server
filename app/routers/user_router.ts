import { Router } from 'express'
import UserController from '#controllers/user_controller'

export const userRouter = Router()
const userController = new UserController()

userRouter.post('/signin', userController.signup)
