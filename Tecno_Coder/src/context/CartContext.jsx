import React, { createContext, useState, useEffect } from 'react';
import { isInCart, totalPrice, totalQuantity } from './cartHelpers'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item, quantity, selectedOptions = {}) => { 
    if (quantity > 0 && item.stock >= quantity) {
      setCartItems(prevCartItems => {
        const existingItemIndex = prevCartItems.findIndex(
          (cartItem) => cartItem.id === item.id && 
                       JSON.stringify(cartItem.selectedOptions) === JSON.stringify(selectedOptions)
        );

        if (existingItemIndex !== -1) {
          const updatedCartItems = [...prevCartItems];
          updatedCartItems[existingItemIndex] = {
            ...updatedCartItems[existingItemIndex],
            quantity: updatedCartItems[existingItemIndex].quantity + quantity,
            stock: updatedCartItems[existingItemIndex].stock - quantity, 
          };
          return updatedCartItems;
        } else {
          return [
            ...prevCartItems,
            { ...item, quantity, stock: item.stock - quantity, selectedOptions },
          ];
        }
      });
    } else {
      alert("No hay suficiente stock disponible.");
    }
  };

  const removeItem = (itemId, selectedOptions = {}) => {
    setCartItems(prevCartItems => {
      return prevCartItems.filter(item => 
        item.id !== itemId || JSON.stringify(item.selectedOptions) !== JSON.stringify(selectedOptions)
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // ... (Las funciones increaseItemQuantity y decreaseItemQuantity deben actualizarse también)
  const increaseItemQuantity = (itemId, selectedOptions = {}) => {
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.id === itemId && 
                 JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );
      if (existingItemIndex !== -1) {
        if (prevCartItems[existingItemIndex].stock > 0) {
          return prevCartItems.map(item =>
            item.id === itemId && 
            JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
              ? { 
                  ...item, 
                  quantity: item.quantity + 1, 
                  stock: item.stock - 1 
                }
              : item
          );
        } else {
          alert("No hay suficiente stock disponible.");
          return prevCartItems;
        }
      } else {
        return prevCartItems;
      }
    });
  };

  const decreaseItemQuantity = (itemId, selectedOptions = {}) => {
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.id === itemId && 
                 JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions) 
      );

      if (existingItemIndex !== -1) {
        if (prevCartItems[existingItemIndex].quantity > 1) {
          return prevCartItems.map(item =>
            item.id === itemId && 
            JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
              ? { 
                  ...item, 
                  quantity: item.quantity - 1, 
                  stock: item.stock + 1 
                }
              : item
          );
        } else {
          return prevCartItems.filter(
            (item) => item.id !== itemId || 
                     JSON.stringify(item.selectedOptions) !== JSON.stringify(selectedOptions)
          );
        }
      } else {
        return prevCartItems;
      }
    });
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addItem,
      removeItem,
      clearCart,
      totalPrice: totalPrice(cartItems),
      totalQuantity: totalQuantity(cartItems),
      increaseItemQuantity,
      decreaseItemQuantity, 
    }}> 
      {children} 
    </CartContext.Provider>
  );
};