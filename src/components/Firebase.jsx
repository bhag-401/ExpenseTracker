// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {getAuth} from "firebase/auth"
import{getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCF0WbENyD7DeghADo-ha75s1RvfyZ9Upg",
  authDomain: "signinsignup-74517.firebaseapp.com",
  projectId: "signinsignup-74517",
  storageBucket: "signinsignup-74517.appspot.com",
  messagingSenderId: "144776487892",
  appId: "1:144776487892:web:720c17a227514b77edac41",
  measurementId: "G-N13NK6M1K9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();
export const db=getFirestore(app);
export default app