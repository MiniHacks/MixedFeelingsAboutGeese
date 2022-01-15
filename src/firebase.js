// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0InEruppbodF_y4O5tqA7wDuqSsy9UI8",
  authDomain: "hacked-2022-b787d.firebaseapp.com",
  projectId: "hacked-2022-b787d",
  storageBucket: "hacked-2022-b787d.appspot.com",
  messagingSenderId: "276384994345",
  appId: "1:276384994345:web:4547b1dd3cd96f0f2af838",
  measurementId: "G-E6RLEY27WE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();
