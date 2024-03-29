import { envs } from '#env'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { userRouter } from '#routers/user_router'
import { morganLogs } from '#middleware/logger'
import { errorHandler } from '#exceptions/handler'
import { emailHandler } from '#mails/handler'

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(morganLogs)

// routes
app.get('/', (_req, res) => {
    res.status(200).json({ hello: 'world' })
})
app.use('/users', userRouter)

// errors
app.use(errorHandler)

app.listen(envs.PORT, () => {
    console.log(`Server listening to ${envs.HOST}:${envs.PORT}`)
    if (process.env.NODE_ENV === 'production') {
        console.log('Production')
    } else {
        emailHandler.makeTransporterDev()
    }
})
