import React, { useState } from "react"

import { decodeToken } from "@/utils/tokenUtils"
import Account from "@/components/Home/Account"
import Body from "@/components/Home/Body"
import Header from "@/components/Home/Header"

interface HomeProps {
    className?: string
}

const Home: React.FC<HomeProps> = ({ className }) => {
    const token = localStorage.getItem("token")
    let tokenData = null

    if (token) {
        tokenData = decodeToken(token)
    }

    const [page, setPage] = useState<string>("order")

    return (
        <div className={`h-screen flex flex-col ${className}`}>
            <Account
                className="absolute top-3 right-3"
                email={tokenData?.sub || ""}
                username={tokenData?.username || ""}
                role={tokenData?.role || ""}
            />
            <Header className="h-[140px]" page={page} setPage={setPage} />
            <Body className="h-full" page={page} />
        </div>
    )
}

export default Home
