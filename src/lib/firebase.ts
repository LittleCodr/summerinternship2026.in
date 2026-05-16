import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAa8Gl7R__BOyXr-_zsL6KIQGqHDYrMGNY",
  authDomain: "internshipshub-in.firebaseapp.com",
  databaseURL: "https://internshipshub-in-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "internshipshub-in",
  storageBucket: "internshipshub-in.firebasestorage.app",
  messagingSenderId: "751067799679",
  appId: "1:751067799679:web:0ad14df02b0c9cc6f89f4a",
  measurementId: "G-1SSVKNL9JS"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { app, db };
