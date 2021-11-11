// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// const data = ref(db,'/Mesures');
// onValue(data, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
// })

