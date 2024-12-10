import LoginBox from "@/components/Login/LoginBox"

interface LoginProps {
    className?: string
}

const Login: React.FC<LoginProps> = ({ className }) => {
    return (
        <div className={className}>
            <div className="flex flex-col items-center justify-center h-screen bg-main-gradient-inverse">
                <LoginBox className="" />
            </div>
        </div>
    )
}

export default Login
