// Import the functions you need from the SDKs you need
import {getApp, initializeApp} from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getAnalytics} from "@firebase/analytics";
import {getApps} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdvnYbPAaaNlNw9jfH9jnpqbpnHza2h_o",
    authDomain: "prepwise-a4414.firebaseapp.com",
    projectId: "prepwise-a4414",
    storageBucket: "prepwise-a4414.firebasestorage.app",
    messagingSenderId: "817414807133",
    appId: "1:817414807133:web:926af1f1ef200844c937b4",
    measurementId: "G-X4CWJPHJYQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;export const auth = getAuth(app);
export const db = getFirestore(app);
