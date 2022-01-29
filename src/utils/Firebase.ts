// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBuUxAL41fPyGyVJQ2EA_ac1Od3KGYh94",
  authDomain: "vigia-nice.firebaseapp.com",
  databaseURL: "https://vigia-nice-default-rtdb.firebaseio.com",
  projectId: "vigia-nice",
  storageBucket: "vigia-nice.appspot.com",
  messagingSenderId: "66171127129",
  appId: "1:66171127129:web:6f0f1d1114b9daf4bcb848"
};

let app:FirebaseApp;

export const signFirebase = () => {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, 'test@gmail.com', '123456')
  .then(_ => '')
  .catch(error => error.message)
}

// const auth = getAuth();
// signInWithEmailAndPassword(auth, 'test@gmail.com', '123456')
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     debugger
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });


// Initialize Firebase
app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
