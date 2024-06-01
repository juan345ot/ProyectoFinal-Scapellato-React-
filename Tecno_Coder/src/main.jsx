import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { BrowserRouter } from 'react-router-dom'; 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCK0WkXycdU0wrNP3hkSQCES99q22LGvDU",
  authDomain: "protectofinalscapellato.firebaseapp.com",
  projectId: "protectofinalscapellato",
  storageBucket: "protectofinalscapellato.appspot.com",
  messagingSenderId: "344500951390",
  appId: "1:344500951390:web:5065ce8d3a5a91135a17cf"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //  <-- ¡Exporta db!

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <BrowserRouter>
        <App /> 
    </BrowserRouter>
  </CartProvider>
);