import { cn } from "@/lib/utils"

interface HeaderInterface {
    page: string
    setPage: React.Dispatch<React.SetStateAction<string>>
    className?: string
}

const Header = ({ page, setPage, className }: HeaderInterface) => {
    const tabs = [
        { id: "order", label: "Realizar prestamo" },
        { id: "list", label: "Listar prestamos" }
    ]

    return (
        <div className={cn("flex flex-col justify-end bg-main-gradient text-white text-xl", className)}>
            <div className="relative">
                <div className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setPage(tab.id)}
                            className={cn(
                                "flex-1 px-4 py-2 transition-colors duration-300",
                                page === tab.id ? "" : "text-gray-400"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div
                    className="absolute bottom-0 h-0.5 bg-gray-200 transition-all duration-300"
                    style={{
                        width: `${100 / tabs.length}%`,
                        transform: `translateX(${tabs.findIndex(t => t.id === page) * 100}%)`
                    }}
                />
            </div>
        </div>
    )
}

export default Header
