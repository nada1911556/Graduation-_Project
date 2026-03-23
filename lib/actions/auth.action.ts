'use server'
import {db,auth} from "@/firebase/admin";
import {cookies} from "next/headers";
import {id} from "zod/locales";
import {redirect} from "next/navigation";
const week=60 * 60 * 24 *7 *1000;
export async function signUp(params:SignUpParams){
   const {uid,name,email} = params;
   try {
       const userRecord=await db.collection('users').doc(uid).get();
       if(!userRecord.exists){
           return {
               success: false,
               message: "User already exists please sign in",
           }
       }
       await db.collection('users').doc(uid).set({name,email});
       return {
           success: true,
           message: "User successfully registered",
       }

   }catch (error:any){
       console.error('Error creating user');
       if(error.code==='auth/email-already-in-use'){
           return{
               success: false,
               message:"User already exists",
           }
       }
       return {
           success: false,
           message:"Failed to register",
       }
   }
}

export async function signIn(params:SignInParams){
    const {idToken,email} = params;
    try{
        const userRecord=await auth.getUserByEmail(email);
        if (!userRecord){
            return {
                success: false,
                message: "User doesn't exist  Do you Want To sign uP",
            }
        }else
        await setSessionCookie(idToken);


    }catch (error){

        console.log(`${error} Error signing in  `);
        return{
            success: false,
            message:"Do you Forgot your password? ",
        }
    }
}

export async function setSessionCookie(idToken:string){
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn: week,
    });
    cookieStore.set('session',sessionCookie,{
        maxAge:week,
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        path:'/',
        sameSite:'lax'
    })
}

export async function getCurrentUser():Promise<User|null>{
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if(!sessionCookie)return null;
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie,true);
        const userRecord=await db.collection('users').doc(decodedClaims.uid).get();
        if(!userRecord.exists) return  null;
        return {
            ...userRecord.data(),
            id:userRecord.id,
        }as User;

    }catch (e){
        console.log(e)
        return null;
    }

}

export async function isAuthenticated()  {
    const user =await getCurrentUser();
    return !!user;
}