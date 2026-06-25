// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "real-estate-marketplace-omkesh.firebaseapp.com",
    projectId: "real-estate-marketplace-omkesh",
    storageBucket: "real-estate-marketplace-omkesh.firebasestorage.app",
    messagingSenderId: "441229268813",
    appId: "1:441229268813:web:d8f9fbfd09da262abbc904",
    measurementId: "G-GYC65B86PW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);