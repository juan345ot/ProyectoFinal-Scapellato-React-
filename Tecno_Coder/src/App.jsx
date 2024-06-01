import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Layout from './components/Layout/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
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
          </Routes>
        </Layout>
    </CartProvider>
  );
}

export default App;
