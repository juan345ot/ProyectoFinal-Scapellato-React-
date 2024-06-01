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

  const addItem = (item, quantity) => {
    if (quantity > 0 && item.stock >= quantity) {
      setCartItems(prevCartItems => {
        // Busca el item en el carrito
        const existingItemIndex = prevCartItems.findIndex(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItemIndex !== -1) {
          // Si el item ya está en el carrito, actualiza la cantidad y el stock
          const updatedCartItems = [...prevCartItems];
          updatedCartItems[existingItemIndex] = {
            ...updatedCartItems[existingItemIndex],
            quantity: updatedCartItems[existingItemIndex].quantity + quantity,
            stock: updatedCartItems[existingItemIndex].stock - quantity,
          };
          return updatedCartItems;
        } else {
          // Si el item no está en el carrito, agrégalo
          return [
            ...prevCartItems,
            { ...item, quantity, stock: item.stock - quantity },
          ];
        }
      });
    } else {
      alert("No hay suficiente stock disponible.");
    }
  };

  const removeItem = (itemId) => {
    setCartItems(prevCartItems => {
      const itemToRemove = prevCartItems.find(item => item.id === itemId);
      if (itemToRemove) {
        const updatedCartItems = prevCartItems.map(item => 
          item.id === itemId ? { ...item, quantity: 0, stock: item.stock + itemToRemove.quantity } : item
        );
        return updatedCartItems.filter(item => item.quantity > 0);
      }
      return prevCartItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const increaseItemQuantity = (itemId) => {
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(item => item.id === itemId);

      // Verifica si el producto ya está en el carrito
      if (existingItemIndex !== -1) {
        // Verifica si hay suficiente stock disponible
        if (prevCartItems[existingItemIndex].stock > 0) {
          // Crea una copia del carrito y actualiza la cantidad y el stock del producto
          return prevCartItems.map(item =>
            item.id === itemId
              ? { 
                  ...item, 
                  quantity: item.quantity + 1, 
                  stock: item.stock - 1 // Decrementa el stock disponible
                }
              : item
          );
        } else {
          // Muestra un mensaje si no hay suficiente stock
          alert("No hay suficiente stock disponible.");
          return prevCartItems; // Devuelve el carrito sin cambios
        }
      } else {
        // Si el producto no está en el carrito, no hagas nada
        return prevCartItems;
      }
    });
  };

  const decreaseItemQuantity = (itemId) => {
    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(item => item.id === itemId);

      if (existingItemIndex !== -1) {
        if (prevCartItems[existingItemIndex].quantity > 1) {
          // Si la cantidad es mayor que 1, disminuye normalmente
          return prevCartItems.map(item =>
            item.id === itemId
              ? { 
                  ...item, 
                  quantity: item.quantity - 1, 
                  stock: item.stock + 1 
                }
              : item
          );
        } else {
          // Si la cantidad es 1 (al presionar "-" llegará a 0), elimina el item
          return prevCartItems.filter(item => item.id !== itemId);
        }
      } else {
        // Si el producto no está en el carrito, no hagas nada
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
      decreaseItemQuantity, // Agrega decreaseItemQuantity al contexto
    }}> 
      {children}
    </CartContext.Provider>
  );
};
