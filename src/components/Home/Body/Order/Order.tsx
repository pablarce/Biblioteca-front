import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button/Button"

interface OrderInterface {
    className?: string
}

const Order = ({ className }: OrderInterface) => {
    const [formData, setFormData] = useState({
        bookName: "",
        quantity: 1,
        startDate: "",
        endDate: "",
    })

    const calculatePenalty = (endDate: string, returnDate = new Date()) => {
        const end = new Date(endDate)
        const diff = returnDate.getTime() - end.getTime()
        const daysLate = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))

        // Penalización: 0.50€ por día de retraso, duplicándose cada 7 días
        const weeks = Math.floor(daysLate / 7)
        const basePenalty = 0.5 * daysLate
        const multiplier = weeks > 0 ? Math.pow(2, weeks) : 1

        return (basePenalty * multiplier).toFixed(2)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí iría la lógica para enviar al backend
        console.log("Préstamo creado:", formData)
        console.log("Penalización si se devuelve hoy:", calculatePenalty(formData.endDate))
    }

    return (
        <div className={cn("w-full h-full p-6", className)}>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto space-y-4 h-full w-full flex flex-col justify-center items-center"
            >
                <div className="space-y-2 w-full">
                    <label className="block text-sm font-medium">
                        Nombre del Libro
                        <input
                            type="text"
                            value={formData.bookName}
                            onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </label>
                </div>

                <div className="space-y-2 w-full">
                    <label className="block text-sm font-medium">
                        Cantidad
                        <input
                            type="number"
                            min="1"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </label>
                </div>

                <div className="space-y-2 w-full">
                    <label className="block text-sm font-medium">
                        Fecha de Inicio
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </label>
                </div>

                <div className="space-y-2 w-full">
                    <label className="block text-sm font-medium">
                        Fecha de Devolución
                        <input
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </label>
                </div>

                <Button type="submit" className="w-full">
                    Crear Préstamo
                </Button>
            </form>
        </div>
    )
}

export default Order
