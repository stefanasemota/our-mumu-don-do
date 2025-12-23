import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import this
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  "projectId": process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  "appId": process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  "apiKey": process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  "authDomain": process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  "measurementId": process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  "messagingSenderId": process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// EXPORT THESE TWO:
export const auth = getAuth(app);
export const db = getFirestore(app); // Ensure this line exists and uses 'export const db'