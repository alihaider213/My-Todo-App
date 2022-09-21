// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA2bSG6yubYV1UeLWbFP1uC_jYhsp0rC2M",
  authDomain: "my-todo-567.firebaseapp.com",
  projectId: "my-todo-567",
  storageBucket: "my-todo-567.appspot.com",
  messagingSenderId: "288861279048",
  appId: "1:288861279048:web:47c820146c7703faa3197d",
  measurementId: "G-DVKBSGXK5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage } 