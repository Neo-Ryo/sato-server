import { z } from 'zod'
import { config } from 'dotenv'
config()

const { DATABASE_URL, PORT, API_KEY, HOST, MAIL_URL, MAIL_USER, MAIL_PWD, CLIENT_URL } =
    process.env

const envSchema = z.object({
    DATABASE_URL: z.string(),
    HOST: z.string(),
    API_KEY: z.string(),
    PORT: z.number(),
    MAIL_URL: z.string(),
    MAIL_USER: z.string(),
    MAIL_PWD: z.string(),
    CLIENT_URL: z.string(),
})

export const envs = envSchema.parse({
    DATABASE_URL,
    PORT: Number(PORT),
    API_KEY,
    HOST,
    MAIL_URL,
    MAIL_USER,
    MAIL_PWD,
    CLIENT_URL
})
