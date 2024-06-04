import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { BrowserRouter } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext'; 
import { WishlistProvider } from './context/WishlistContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider> 
    <AuthProvider> 
      <WishlistProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WishlistProvider>
    </AuthProvider>
  </CartProvider>
);
