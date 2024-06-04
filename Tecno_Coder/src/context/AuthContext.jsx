// AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from '../firebase'; 
import { CartContext } from '../context/CartContext'; 
const AuthContext = createContext();

const auth = getAuth(app); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // Si no hay un usuario (cierre de sesión), limpia el carrito
      if (!user) {
        clearCart(); 
      } 
    });

    return unsubscribe; 
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Actualiza el estado 'user' después del cierre de sesión
        console.log('Sesión cerrada correctamente'); // Mensaje de depuración
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error); // Manejo de errores
      });
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleSignOut }}> 
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};