import { envs } from './env'
import express from 'express'
import { userRouter } from '#routers/user_router'
import helmet from 'helmet'

const app = express()

app.use(helmet())

// routes
app.get('/', (_req, res) => {
    res.status(200).json({ hello: 'world' })
})
app.use('/users', userRouter)

app.listen(envs.PORT, () => {
    console.log(`Server listening to ${envs.HOST}:${envs.PORT}`)
})
