import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ArrowLeftFromLine, User, UserRound, UserRoundCog, UserRoundCogIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button/Button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form/Form"
import { Input } from "@/components/ui/Input/Input"

// Define the form validation schema with Zod
const registerFormSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: "Username must be at least 2 characters." })
            .max(50, { message: "Username cannot exceed 50 characters." }),
        email: z.string().email({ message: "Invalid email address." }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters." })
            .max(100, { message: "Password cannot exceed 100 characters." }),
        confirmPassword: z
            .string()
            .min(6, { message: "Password confirmation must be at least 6 characters." })
            .max(100, { message: "Password confirmation cannot exceed 100 characters." }),
        role: z.enum(["user", "admin"], {
            required_error: "Por favor selecciona un rol.",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match.",
        path: ["confirmPassword"],
    })

interface RegisterFormInputs {
    username: string
    email: string
    password: string
    confirmPassword: string
    role: "user" | "admin"
}

interface RegisterBoxProps {
    className?: string
    setIsLogin: (isLogin: boolean) => void
    isLogin: boolean
}

const RegisterBox: React.FC<RegisterBoxProps> = ({ className, setIsLogin, isLogin }) => {
    // Initialize the form with Zod validation
    const form = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "user",
        },
    })

    const [selectedRole, setSelectedRole] = useState<"user" | "admin">("user")

    const onSubmit = (data: RegisterFormInputs) => {
        console.log("Register data:", { ...data, role: selectedRole })
        // You can handle form submission here (e.g., make an API request)
    }

    return (
        <div className={cn(className, "flex flex-col items-center justify-center text-white")}>
            <div className="flex items-center justify-between w-full">
                <div
                    className="rounded-full hover:bg-gray-700 p-3 w-10 h-10 flex items-center justify-center duration-300 cursor-pointer"
                    onClick={() => setIsLogin(true)}
                >
                    <ArrowLeftFromLine className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-xl font-bold mb-1">Registrarse</h1>
                    <h2 className="text-sm font-light text-center">Crea tu cuenta para continuar</h2>
                </div>
                <div className="w-10" />
            </div>

            <div className="py-2" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    {/* Username Field */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Username</FormLabel>
                                <FormControl className="w-full">
                                    <Input
                                        className="bg-gray-700 w-full"
                                        placeholder="Enter username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl className="w-full">
                                    <Input
                                        className="bg-gray-700 w-full"
                                        placeholder="Enter email"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Password Field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter password" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password Field */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm password" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={() => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex space-x-4 w-full pt-5">
                                        <div
                                            className={`select-none flex flex-col items-center justify-center cursor-pointer duration-300 p-4 border w-1/2 ${selectedRole === "user" ? "bg-gray-700 border-white shadow-xl" : "bg-gray-500 border-gray-800"}`}
                                            onClick={() => setSelectedRole("user")}
                                        >
                                            <User/>
                                            <p>Usuario</p>
                                        </div>
                                        <div
                                            className={`select-none flex flex-col items-center justify-center cursor-pointer duration-300 p-4 border w-1/2 ${selectedRole === "admin" ? "bg-gray-700 border-white shadow-xl" : "bg-gray-500 border-gray-800"}`}
                                            onClick={() => setSelectedRole("admin")}
                                        >
                                            <UserRoundCog></UserRoundCog>
                                            <p>Administrador</p>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage>{form.formState.errors.role?.message}</FormMessage>
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="mt-4 w-full hover:bg-gray-700">
                        Registrarse
                    </Button>
                </form>
            </Form>
            <p className="text-sm font-light text-center pt-4 ">
                Al hacer clic en registrarse, aceptas nuestros Términos de Servicio y Política de Privacidad.
            </p>
        </div>
    )
}

export default RegisterBox
