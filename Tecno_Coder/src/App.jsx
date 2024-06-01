import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter
import Layout from './components/Layout/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';// Ajusta la ruta si es necesario
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider> 
        <Layout>
          <Routes>
          <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda en línea!" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por Categoría" />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> {/* Nueva ruta para Checkout */}
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default App;
