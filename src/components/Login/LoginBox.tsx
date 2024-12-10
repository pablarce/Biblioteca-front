import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
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
const formSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Username must be at least 2 characters." })
        .max(50, { message: "Username cannot exceed 50 characters." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." })
        .max(100, { message: "Password cannot exceed 100 characters." }),
})

interface LoginFormInputs {
    username: string
    password: string
}

const LoginBox: React.FC<{ className?: string }> = ({ className }) => {
    // Initialize the form with Zod validation
    const form = useForm<LoginFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = (data: LoginFormInputs) => {
        console.log("Login data:", data)
        // You can handle form submission here (e.g., make an API request)
    }

    return (
        <div
            className={cn(
                className,
                "flex flex-col items-center justify-center p-4 shadow-md rounded-md border border-gray-200 bg-gray-800 duration-300"
            )}
        >
            <div className="flex flex-col items-center justify-centertext-gray-200 text-white w-3/4">
                <h1 className="text-xl font-bold mb-1">Biblioteca</h1>
                <h2 className="text-sm font-light text-center">Ingresa tus credenciales para continuar</h2>
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
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage>{form.formState.errors.username?.message}</FormMessage>
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
                                    <FormDescription>Enter your password.</FormDescription>
                                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="mt-4 w-full hover:bg-gray-700">
                            Login
                        </Button>
                    </form>
                </Form>
                <div className="flex justify-center gap-1">
                    <div className="w-fit h-px bg-gray-700"></div>
                    <p className="text-sm font-light text-center pt-4">
                        By clicking continue, you agree to our Terms of Service and Privacy Policy.
                    </p>
                    <div className="w-fit h-px bg-gray-700"></div>
                </div>
            </div>
        </div>
    )
}

export default LoginBox
