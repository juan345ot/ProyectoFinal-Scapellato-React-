export const isInCart = (cartItems, id) => cartItems.some(item => item.id === id);

export const addItem = (cartItems, setCartItems, item, quantity) => {
  if (quantity > 0) {
    if (isInCart(cartItems, item.id)) {
      setCartItems(prevCartItems => prevCartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ));
    } else {
      setCartItems(prevCartItems => [...prevCartItems, { ...item, quantity }]);
    }
  }
};

export const removeItem = (cartItems, setCartItems, itemId, products, setProducts) => {
  const itemToRemove = cartItems.find(item => item.id === itemId);
  if (itemToRemove) {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === itemId
          ? { ...product, stock: product.stock + itemToRemove.quantity } 
          : product
      )
    );
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== itemId));
  }
};

export const clearCart = (cartItems, setCartItems, products, setProducts) => {
  setProducts(prevProducts => {
    return prevProducts.map(product => {
      const cartItem = cartItems.find(item => item.id === product.id);
      return cartItem ? { ...product, stock: product.stock + cartItem.quantity } : product;
    });
  });
  setCartItems([]);
};

export const totalPrice = (cartItems) => 
  cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

export const totalQuantity = (cartItems) => 
  cartItems.reduce((total, item) => total + item.quantity, 0);
