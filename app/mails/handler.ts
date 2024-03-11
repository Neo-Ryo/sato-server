import { createTransport, Transporter } from 'nodemailer'
import { envs } from '#env'
import { CustomError } from '#app/exceptions/handler'

const { MAIL_USER, MAIL_URL, MAIL_PWD } = envs

class EmailHandler {
    transporter?: Transporter
    isTransporterReady: Boolean
    constructor() {
        this.isTransporterReady = false
    }
    makeTransporterDev() {
        this.transporter = createTransport({
            host: MAIL_URL,
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: MAIL_USER,
                pass: MAIL_PWD,
            },
        })
        this.transporter.verify((error: unknown, success: unknown) => {
            if (error) {
                console.log(error)
                this.isTransporterReady = false
            } else {
                console.log('Server mail is ready to take our messages')
                this.isTransporterReady = true
            }
        })
    }
    makeTransporterProd() {
        return
    }
    sendEmail(
        from: string,
        to: string,
        subject: string,
        text?: string,
        html?: string,
    ) {
        if (this.transporter && this.isTransporterReady) {
            this.transporter.sendMail({
                from,
                to,
                subject,
                text,
                html,
            })
        } else {
            throw new CustomError(400, 'Transporter not ready')
        }
    }
}

export const emailHandler = new EmailHandler()
