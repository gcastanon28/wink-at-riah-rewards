import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC_HF-I_S7HY8y-LE6tsDfVQb2XL00znzE",
  authDomain: "wink-at-riah-rewards.firebaseapp.com",
  projectId: "wink-at-riah-rewards",
  storageBucket: "wink-at-riah-rewards.firebasestorage.app",
  messagingSenderId: "350846962113",
  appId: "1:350846962113:web:7e6694badfdb95088a8740",
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)