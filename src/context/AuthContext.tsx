import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface AuthContextType {
    isAuthenticated: boolean
    token: string | null
    login: (token: string) => void
    logout: () => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"))

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token)
        } else {
            localStorage.removeItem("token")
        }
    }, [token])

    const login = (newToken: string) => {
        setToken(newToken)
    }

    const logout = () => {
        setToken(null)
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
