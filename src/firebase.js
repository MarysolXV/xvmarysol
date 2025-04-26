// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhoXZW3JWxlNuD3xlUUGmgliJfIA1NMKM",
  authDomain: "marysolxv-78bae.firebaseapp.com",
  projectId: "marysolxv-78bae",
  storageBucket: "marysolxv-78bae.firebasestorage.app",
  messagingSenderId: "420637461521",
  appId: "1:420637461521:web:4ded9fb1b1db95976c75b0"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta las funciones que necesitas usar
export { db, collection, addDoc };