import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRtqWhgTZdgvqliMfGFlgzzr4aNiqfGmw",
  authDomain: "neighborhoodnannies-cc533.firebaseapp.com",
  projectId: "neighborhoodnannies-cc533",
  storageBucket: "neighborhoodnannies-cc533.firebasestorage.app",
  messagingSenderId: "111458673339",
  appId: "1:111458673339:web:02afc2604e04bdfd85bf9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
