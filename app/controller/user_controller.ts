import vine from '@vinejs/vine'
import { HttpContext } from '../../types/http'

export default class UserController {
    async signin({ request, response }: HttpContext) {
        try {
        } catch (error) {
            response.status(500).json('Internal error')
        }
    }
}
