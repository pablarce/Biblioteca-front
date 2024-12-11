import { jwtDecode } from "jwt-decode"

interface TokenData {
    sub: string
    username: string
    role: string
    exp?: number
    iat?: number
}

export const decodeToken = (token: string): TokenData | null => {
    try {
        const decoded = jwtDecode<TokenData>(token)
        return decoded
    } catch (error) {
        console.error("Failed to decode token:", error)
        return null
    }
}
