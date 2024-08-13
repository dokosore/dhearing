import { initializeApp } from "firebase/app";
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore";

const ENV = process.env.NEXT_PUBLIC_ENV ?? "";

const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

// Initialize Firebase
export const app = initializeApp(FIREBASE_CONFIG);

const initFirestore = (): Firestore => {
  try {
    const firestore: Firestore = getFirestore(app);
    if (ENV === "local") {
      connectFirestoreEmulator(firestore, "localhost", 8080);
    }
    return firestore;
  } catch (error) {
    console.error("Error initializing database", error);
    throw error;
  }
};

export const firestore = initFirestore();
