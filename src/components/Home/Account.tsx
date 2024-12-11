import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { CalendarDays } from "lucide-react"

import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/Hover-card/Hover-card"
interface AccountProps {
    email: string
    username: string
    role: string
    className?: string
}

const Account = ({ email, username, role, className }: AccountProps) => {
    const { logout } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogout = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 400)) // Simula un retraso de 400 ms
        logout()
        setIsLoading(false)
    }

    return (
        <HoverCard>
            <HoverCardTrigger className={cn(className, "w-16 h-16 cursor-pointer")}>
                <Avatar
                    className={cn(
                        className,
                        "rounded-full hover:opacity-75 hover:scale-105 transition-all border-gray-200"
                    )}
                >
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                    <AvatarImage
                        className="border border-gray-400  rounded-full"
                        src={`https://github.com/${username}.png`}
                    />
                </Avatar>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex justify-between items-center space-x-4">
                        <Avatar>
                            <AvatarImage
                                className="border border-black  rounded-full"
                                src="https://github.com/vercel.png"
                            />
                            <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">@{username}</h4>
                            <p className="text-sm">{email}</p>
                            <div className="flex items-center">
                                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                <span className="text-xs text-muted-foreground">Joined December 2024</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-2 px-4 py-2 bg-black w-full text-white rounded hover:bg-gray-700 transition flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="animate-spin h-5 w-5 mr-2" />} <p>Logout</p>
                    </button>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default Account
