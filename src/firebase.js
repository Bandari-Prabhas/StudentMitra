import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJ4GGqq7LWm3sGfBIVydge7jAs2xMDOEQ",
  authDomain: "studentmitra-dbeb2.firebaseapp.com",
  projectId: "studentmitra-dbeb2",
  storageBucket: "studentmitra-dbeb2.appspot.com",
  messagingSenderId: "1096194489444",
  appId: "1:1096194489444:web:a40c23f2f8c6574d5db371",
  measurementId: "G-LZ9BSWQ94L"
};

// ✅ Prevent reinitialization
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { app, db, auth, provider, storage };
