// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3cjAqphyfFDb-K1g84oXXcTQ0ejgnd4w",
  authDomain: "winxshopeid-a42a3.firebaseapp.com",
  databaseURL: "https://winxshopeid-a42a3-default-rtdb.firebaseio.com",
  projectId: "winxshopeid-a42a3",
  storageBucket: "winxshopeid-a42a3.appspot.com",
  messagingSenderId: "353629331821",
  appId: "1:353629331821:web:7a71785283a90f9388ba64",
  measurementId: "G-ZJQBVE2HHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth(app);
