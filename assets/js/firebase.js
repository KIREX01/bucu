// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9xhgSt-A8FHfyeDC5ALJS-HtdkOOlCx8",
  authDomain: "bucu-fellowship.firebaseapp.com",
  projectId: "bucu-fellowship",
  storageBucket: "bucu-fellowship.firebasestorage.app",
  messagingSenderId: "630929961956",
  appId: "1:630929961956:web:5662c043d7d6e8710b8df1",
  measurementId: "G-FY31CDZ78L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);