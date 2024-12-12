import { cn } from "@/lib/utils"

interface ListInterface {
    className?: string
}

interface Loan {
    id: number
    bookName: string
    author: string
    genre: string
    quantity: number
    startDate: string
    endDate: string
    status: 'active' | 'returned' | 'late'
}

const List = ({ className }: ListInterface) => {
    // Datos de ejemplo - esto vendría del backend
    const mockLoans: Loan[] = [
        {
            id: 1,
            bookName: "Don Quijote",
            author: "Miguel de Cervantes",
            genre: "Novela clásica",
            quantity: 1,
            startDate: "2024-01-01",
            endDate: "2024-01-15",
            status: "active"
        },
        {
            id: 2,
            bookName: "Cien años de soledad",
            author: "Gabriel García Márquez",
            genre: "Realismo mágico",
            quantity: 2,
            startDate: "2023-12-15",
            endDate: "2024-01-05",
            status: "late"
        }
    ]

    return (
        <div className={cn("w-full h-full p-6", className)}>
            <div className="grid gap-4 overflow-y-auto">
                {mockLoans.map((loan) => (
                    <div 
                        key={loan.id}
                        className={cn(
                            "p-4 rounded-lg shadow",
                            loan.status === 'active' ? "bg-green-50" :
                            loan.status === 'late' ? "bg-red-50" : "bg-gray-50"
                        )}
                    >
                        <h3 className="font-bold text-lg">{loan.bookName}</h3>
                        <div className="mt-1 text-sm text-gray-600 grid grid-cols-2 w-fit gap-x-8 gap-y-2">
                            <p><span className="font-bold">Autor:</span> {loan.author}</p>
                            <p><span className="font-bold">Género:</span> {loan.genre}</p>
                            <p><span className="font-bold">Cantidad:</span> {loan.quantity}</p>
                            <p><span className="font-bold">Inicio:</span> {new Date(loan.startDate).toLocaleDateString()}</p>
                            <p><span className="font-bold">Devolución:</span> {new Date(loan.endDate).toLocaleDateString()}</p>
                            <p className={cn(
                                "font-semibold",
                                loan.status === 'active' ? "text-green-600" :
                                loan.status === 'late' ? "text-red-600" : "text-gray-600"
                            )}>
                                <span className="font-bold text-gray-600">Estado:</span>{" "}
                                {loan.status === 'active' ? "Activo" :
                                 loan.status === 'late' ? "Retrasado" : "Devuelto"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List
