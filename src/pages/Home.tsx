import React from "react"

import { decodeToken } from "@/utils/tokenUtils"
import Account from "@/components/Home/Account"

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
            <Account
                className="absolute top-3 right-3"
                email={tokenData?.sub || ""}
                username={tokenData?.username || ""}
                role={tokenData?.role || ""}
            />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Home</h1>
            </div>
        </div>
    )
}

export default Home
