import { envs } from './env'
import express from 'express'

const app = express()

app.get('/', (_req, res) => {
    res.status(200).json({ hello: 'world' })
})

app.listen(envs.PORT, () => {
    console.log(`Server listening to ${envs.HOST}:${envs.PORT}`)
})
