import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "vet-app-test-23a87.firebaseapp.com",
  projectId: "vet-app-test-23a87",
  storageBucket: "vet-app-test-23a87.appspot.com",
  messagingSenderId: "489448098149",
  appId: "1:489448098149:web:a0a17f3b1d04c15b12f98c",
  measurementId: "G-52SSFP1RZ3",

  // apiKey: "AIzaSyDASzGzwDa_6ZDih51u0Aavq7MXe13D9iY",
  // authDomain: "veterinary-app-7c983.firebaseapp.com",
  // projectId: "veterinary-app-7c983",
  // storageBucket: "veterinary-app-7c983.appspot.com",
  // messagingSenderId: "977527321616",
  // appId: "1:977527321616:web:aefe3e015c4c9653e84695",
  // measurementId: "G-X830ECHN8V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
