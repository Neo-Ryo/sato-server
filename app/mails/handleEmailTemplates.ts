import { readFileSync } from "fs"
import path from "path"

export function valitationEmailTemplate(customUrl: string) {
    const template = readFileSync(path.resolve(__dirname, "./validationMailTemplate.html"), 'utf-8').replace('{validationUrl}', `"${customUrl}"`)
    return template
}