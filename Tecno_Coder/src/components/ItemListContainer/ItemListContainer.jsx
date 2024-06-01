import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../mock/asyncMock';
import ItemList from '../ItemList/ItemList';
import { CartContext } from '../../context/CartContext'; 

function ItemListContainer({ greeting }) {
  const { cartItems } = useContext(CartContext); // Accede al contexto
  const [products, setProducts] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = categoryId
          ? await getProductsByCategory(categoryId)
          : await getProducts();
        setProducts(fetchedProducts); // Actualiza solo el estado de los productos
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]); //  cartItems  ya no es una dependencia de useEffect
  const handleAdd = (quantity, product) => {
    // addItem(product, quantity); // Probablemente necesites addItem aquí
    console.log(`Se agregaron ${quantity} unidades de ${product.title} al carrito`);
  };
  return (
    <div className="item-list-container p-4 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full bg-gray-200">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-3">{greeting}</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ItemList products={products} onAdd={handleAdd} /> // Usa 'products' aquí
      )}
    </div>
  );
}

export default ItemListContainer;
