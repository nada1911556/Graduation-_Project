"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "sonner"
import Image from "next/image"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

import FormField from "./FormField"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"

// تعريف النوع محلياً لضمان عدم وجود خطأ "Module not found"
type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3, "Name is too short") : z.string().optional(),
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter()
    const isSignIn = type === "sign-in"
    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", password: "" },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            if (type === "sign-up") {
                const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
                await signUp({ uid: userCredential.user.uid, name: data.name!, email: data.email, password: data.password })
                toast.success("Account created!")
                router.push("/signin")
            } else {
                const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
                const idToken = await userCredential.user.getIdToken()
                await signIn({ email: data.email, idToken })
                router.push("/")
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row justify-center gap-2">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100B">PrepWise</h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-6 form">
                        {!isSignIn && <FormField control={form.control} name="name" label="Full Name" />}
                        <FormField control={form.control} name="email" label="Email" />
                        <FormField control={form.control} name="password" label="Password" type="password" />
                        <Button className="btn w-full" type="submit">
                            {isSignIn ? "Sign In" : "Create Account"}
                        </Button>
                    </form>
                </Form>
                <p className="text-center">
                    <Link href={isSignIn ? "/signup" : "/signin"} className="font-bold text-user-primary">
                        {isSignIn ? "Create an account" : "Already have an account? Sign in"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm