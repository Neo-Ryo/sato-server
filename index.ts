import { envs } from './env'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { userRouter } from '#routers/user_router'
import { morganLogs } from '#middleware/logger'

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(morganLogs)

// routes
app.get('/', (_req, res) => {
    res.status(200).json({ hello: 'world' })
})
app.use('/users', userRouter)

app.listen(envs.PORT, () => {
    console.log(`Server listening to ${envs.HOST}:${envs.PORT}`)
})
