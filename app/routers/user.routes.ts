import { Router } from 'express'

export const userRouter = Router()

userRouter.post('/signin', (req, res) => {
    res.status(200).json({ route: 'signin' })
})
