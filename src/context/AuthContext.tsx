import React, { createContext, ReactNode, useContext, useState } from "react"

interface AuthContextType {
    isAuthenticated: boolean
    token: string | null
    login: (token: string) => void
    logout: () => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null)

    const login = (newToken: string) => {
        setToken(newToken)
        localStorage.setItem("token", newToken)
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem("token")
    }

    const isAuthenticated = !!token

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>{children}</AuthContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
