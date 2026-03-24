"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {type} from "node:os";
import FormField from "./FormField";
import {useRouter} from "next/navigation";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/client";
import {setSessionCookie, signIn, signUp} from "@/lib/actions/auth.action";
// 1. تحديد قوانين الحقل (Validation Schema)
// const formSchema = z.object({
//     username: z
//         .string()
//         .min(2, "Username must be at least 2 characters.")
//         .max(20, "Username must not exceed 20 characters."),
// })

const  authFormSchema=(type:FormType)=>{
    return z.object({name:type==="sign-up"?z.string().min(3):z.string().optional(),
    email:z.string().min(3),
    password:z.string().min(5),
    })

}

const AuthForm = ({type}:{type:FormType}) => {
    const router = useRouter();
    const formSchema=authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 3. دالة الإرسال
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            if (type === "sign-up") {
                const { name, email, password } = data;

                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const result = await signUp({
                    uid: userCredential.user.uid,
                    name: name!,
                    email,
                    password,
                });

                if (!result.success) {
                    toast.error(result.message);
                    return;
                }

                toast.success("Account created successfully. Please sign in.");
                router.push("/sign-in");
            } else {
                const { email, password } = data;

                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const idToken = await userCredential.user.getIdToken();
                if (!idToken) {
                    toast.error("Sign in Failed. Please try again.");
                    return;
                }

                await signIn({
                    email,
                    idToken,
                });

                toast.success("Signed in successfully.");
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }
    };

    const isSignIn=type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row justify-center gap-2">
                    <Image src="/logo.svg" alt="logo" height={32} width={38}/>
                    <h2 className="text-primary-100B">PrepWise</h2>
                </div>
                    <h3 className="text-center">Practise Job interview With AI</h3>


                <Form {...form}>
                    {!isSignIn && (<FormField control={form.control} name="name" label="name"/>)}
                    <FormField control={form.control} name="email" label="email"/>
                    <FormField control={form.control} name="password" label="password" type="password" />
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-6 form">
                        <Button className="btn" type="submit">{isSignIn?'sign in':'Create Account'}</Button>
                    </form>



                </Form>
                <p className="text-center">
                    {isSignIn?"No Account yet ?":"Have an account?"}
                    <Link href={!isSignIn?"/signin":"/signup" } className="font-bold text-user-primary ml-1">
                        {!isSignIn?"Sign in":"Signup"}
                    </Link>

                </p>
            </div>
        </div>
    )
}
export default AuthForm
