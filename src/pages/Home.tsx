interface HomeProps {
    className?: string
}

const Home: React.FC<HomeProps> = ({ className }) => {
    return <div className={className}>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Home</h1>
        </div>
    </div>
}

export default Home