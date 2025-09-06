import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtxt7XsL52iyAKj4jJ4ATc6ptoF-tRewE",
  authDomain: "money-tracker-app-f4aa5.firebaseapp.com",
  projectId: "money-tracker-app-f4aa5",
  storageBucket: "money-tracker-app-f4aa5.firebasestorage.app",
  messagingSenderId: "916762449280",
  appId: "1:916762449280:web:98bf8bc611cf03ab045d65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };