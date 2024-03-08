import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient().$extends({
    model: {
        user: {
            async signUp(email: string, password: string) {
                const hash = await bcrypt.hash(password, 10)
                return prisma.user.create({
                    data: {
                        email,
                        password: hash,
                    },
                    select: {
                        password: false,
                        accessToken: false,
                        email: true,
                        id: true,
                        username: true,
                    },
                })
            },
        },
    },
})
