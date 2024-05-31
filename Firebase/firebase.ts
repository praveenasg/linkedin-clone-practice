import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl5eGryleaPoNGdi7UGvKhzUWGmcbQeis",
  authDomain: "practice-93df5.firebaseapp.com",
  projectId: "practice-93df5",
  storageBucket: "practice-93df5.appspot.com",
  messagingSenderId: "463020312991",
  appId: "1:463020312991:web:e86fa78ec0048e2928d5aa",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
