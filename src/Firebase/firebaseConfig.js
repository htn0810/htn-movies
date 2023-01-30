// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhNAPtQJTBteC6qw5dD0Y44ggtOAgWVZA",
  authDomain: "my-unknown-movies.firebaseapp.com",
  projectId: "my-unknown-movies",
  storageBucket: "my-unknown-movies.appspot.com",
  messagingSenderId: "216427463977",
  appId: "1:216427463977:web:7c6fb713937c4124f4a338",
  measurementId: "G-FB3BLSTKBW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
