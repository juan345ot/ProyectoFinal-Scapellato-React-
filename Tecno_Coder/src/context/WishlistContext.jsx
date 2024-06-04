// context/WishlistContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Cargar la wishlist desde localStorage al iniciar
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlistItems');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  // Guardar la wishlist en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addWishlistItem = (item) => {
    // Verificar si el producto ya está en la wishlist
    const itemIndex = wishlistItems.findIndex(wishlistItem => wishlistItem.id === item.id);
    if (itemIndex === -1) {
      // Si no está, agregarlo
      setWishlistItems(prevItems => [...prevItems, item]); 
    } else {
      // Si ya está, podrías mostrar un mensaje o no hacer nada
    }
  };

  const removeWishlistItem = (itemId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Nueva función para verificar si un producto está en la wishlist
  const isProductInWishlist = (itemId) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addWishlistItem, 
      removeWishlistItem,
      isProductInWishlist // <-- Nueva función
    }}>
      {children}
    </WishlistContext.Provider>
  );
};