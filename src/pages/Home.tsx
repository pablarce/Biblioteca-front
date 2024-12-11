import React from "react"
import { decodeToken } from "@/utils/tokenUtils"

interface HomeProps {
    className?: string
}

const Home: React.FC<HomeProps> = ({ className }) => {
    const token = localStorage.getItem("token")
    let tokenData = null

    if (token) {
        tokenData = decodeToken(token)
    }

    return (
        <div className={className}>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Home</h1>
                {tokenData ? (
                    <div className="text-center">
                        <p><strong>Email:</strong> {tokenData.sub}</p>
                        <p><strong>Username:</strong> {tokenData.username}</p>
                        <p><strong>Role:</strong> {tokenData.role}</p>
                    </div>
                ) : (
                    <p>No token data available.</p>
                )}
            </div>
        </div>
    )
}

export default Home
