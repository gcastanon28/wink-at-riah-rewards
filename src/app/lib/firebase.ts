import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
apiKey: "AIzaSyCHf-I_S7HY8y-LE6tsDFVQb2XL00znzE",
authDomain: "wink-at-riah-rewards.firebaseapp.com",
projectId: "wink-at-riah-rewards",
storageBucket: "wink-at-riah-rewards.appspot.com",
messagingSenderId: "350846962113",
appId: "1:350846962113:web:4c6fee42b451c0ad8a8740"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);