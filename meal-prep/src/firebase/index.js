import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk5uzuiaadUuq8bg6YzZdj0kxFExRmpl0",
  authDomain: "meal-prep-4068c.firebaseapp.com",
  databaseURL: "https://meal-prep-4068c.firebaseio.com",
  projectId: "meal-prep-4068c",
  storageBucket: "meal-prep-4068c.appspot.com",
  messagingSenderId: "1056546759379",
  appId: "1:1056546759379:web:8dd088e4269d7a4bbaaa26",
  measurementId: "G-VLG59WTX84"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
