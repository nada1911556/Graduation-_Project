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

// الاستيرادات الخاصة بمشروعك
import FormField from "./FormField"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"

// 1. تحديد قوانين التحقق (Schema)
const authFormSchema = (type: string) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل") : z.string().optional(),
        email: z.string().email("البريد الإلكتروني غير صالح"),
        password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    })
}

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
    const router = useRouter()
    const isSignIn = type === "sign-in"
    const formSchema = authFormSchema(type)

    // 2. إعداد الفورم
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 3. دالة الإرسال (Submit Handler)
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (type === "sign-up") {
                // عملية التسجيل الجديد
                const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password)

                const result = await signUp({
                    uid: userCredential.user.uid,
                    name: values.name!,
                    email: values.email,
                    password: values.password,
                })

                if (!result.success) {
                    toast.error(result.message)
                    return
                }

                toast.success("تم إنشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن")
                router.push("/signin")
            } else {
                // عملية تسجيل الدخول
                const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)
                const idToken = await userCredential.user.getIdToken()

                await signIn({
                    email: values.email,
                    idToken,
                })

                toast.success("تم تسجيل الدخول بنجاح")
                router.push("/") // التوجه للصفحة الرئيسية
            }
        } catch (error: any) {
            console.error(error)
            toast.error("حدث خطأ: " + (error.message || "فشلت العملية"))
        }
    }

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row justify-center gap-2">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100B">PrepWise</h2>
                </div>
                <h3 className="text-center text-light-100">Practise Job interview With AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-6 form">
                        {/* الحقول الآن داخل الـ form لضمان عمل الـ Submit */}
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Full Name"
                                placeholder="Enter your name"
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            label="Email Address"
                            placeholder="example@mail.com"
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                        />

                        <Button className="btn w-full" type="submit">
                            {isSignIn ? "Sign In" : "Create Account"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center text-light-200">
                    {isSignIn ? "No Account yet?" : "Already have an account?"}
                    <Link
                        href={isSignIn ? "/signup" : "/signin"}
                        className="font-bold text-user-primary ml-2 hover:underline"
                    >
                        {isSignIn ? "Sign up" : "Sign in"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm