export function createURLWithToken(url: string, token: string): URL {
    return new URL(token, url)
}