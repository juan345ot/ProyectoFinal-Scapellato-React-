import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart'; 
import { CartProvider } from './context/CartContext'; // Importa el CartProvider
import './App.css';

function App() {
  return (
    <CartProvider> {/* Envuelve la aplicación con el CartProvider */}
      <Layout>
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda en línea!" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por Categoría" />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default App;
