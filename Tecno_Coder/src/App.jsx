import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import SignIn from './components/SignIn/SignIn';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders'; 
import Wishlist from './components/Wishlist/Wishlist'; // Importa el componente
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda en línea!" />} />
            <Route path="/category/:categoryKey" element={<ItemListContainer greeting="Productos por Categoría" />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/orders" element={<Orders />} /> 
            <Route path="/wishlist" element={<Wishlist />} /> 
          </Routes>
        </Layout>
    </CartProvider>
  );
}

export default App;
