// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCK0WkXycdU0wrNP3hkSQCES99q22LGvDU", // Reemplaza con tus datos
  authDomain: "protectofinalscapellato.firebaseapp.com", 
  projectId: "protectofinalscapellato",
  storageBucket: "protectofinalscapellato.appspot.com",
  messagingSenderId: "344500951390", 
  appId: "1:344500951390:web:5065ce8d3a5a91135a17cf"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }; 
