import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); 

  const addItem = (item, quantity) => {
    if (quantity > 0) { // Verifica si la cantidad es mayor que 0
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        // Si el artículo ya existe, actualiza la cantidad
        setCartItems(prevCartItems => prevCartItems.map((cartItem, index) => 
          index === existingItemIndex 
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        ));
      } else {
        // Si el artículo no existe, agrégalo al carrito
        setCartItems(prevCartItems => [...prevCartItems, { ...item, quantity }]);
      }

      updateProductStock(item.id, quantity); // Actualiza el stock del producto
    }
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const updateProductStock = (itemId, quantity) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === itemId 
          ? { ...product, stock: product.stock - quantity } 
          : product
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, totalPrice, totalQuantity, products, setProducts }}> 
      {children}
    </CartContext.Provider>
  );
};
