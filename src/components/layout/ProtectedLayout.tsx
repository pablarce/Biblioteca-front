import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import Paths from "@/router/paths"

const ProtectedLayout: React.FC = () => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to={Paths.LOGIN} replace />
    }

    return (
        <main>
            <Outlet />
        </main>

    )
}

export default ProtectedLayout
