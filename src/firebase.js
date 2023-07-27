import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmf2IfBuTphzyd7DpiLjsSqmB0A3tH26I",
  authDomain: "vet-app-test-23a87.firebaseapp.com",
  projectId: "vet-app-test-23a87",
  storageBucket: "vet-app-test-23a87.appspot.com",
  messagingSenderId: "489448098149",
  appId: "1:489448098149:web:a0a17f3b1d04c15b12f98c",
  measurementId: "G-52SSFP1RZ3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
