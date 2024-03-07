import { z } from 'zod'
import { config } from 'dotenv'
config()

const { DATABASE_URL, PORT, API_KEY, HOST } = process.env

const envSchema = z.object({
    DATABASE_URL: z.string(),
    HOST: z.string(),
    API_KEY: z.string(),
    PORT: z.number(),
})

export const envs = envSchema.parse({
    DATABASE_URL,
    PORT: Number(PORT),
    API_KEY,
    HOST,
})
