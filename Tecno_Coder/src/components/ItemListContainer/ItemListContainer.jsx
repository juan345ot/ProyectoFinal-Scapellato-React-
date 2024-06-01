import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory, getProducts } from '../../mock/asyncMock';
import ItemList from '../ItemList/ItemList';
import { CartContext } from '../../context/CartContext'; 

function ItemListContainer({ greeting }) {
  const { addItem, products, setProducts } = useContext(CartContext); 
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = categoryId
          ? await getProductsByCategory(categoryId)
          : await getProducts();
        setProducts(fetchedProducts); 
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);

  const handleAdd = (quantity, product, setCount) => {
    addItem(product, quantity); 
    console.log(`Se agregaron ${quantity} unidades de ${product.title} al carrito`);
    resetItemCount(product.id, setCount); 
  };
  const resetItemCount = (productId, setCount) => { 
    setCount(0); 

    setProducts(prevProducts => prevProducts.map(product => 
      product.id === productId ? { ...product, count: 0 } : product
    ));
  };
  return (
    <div className="item-list-container p-4 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full bg-gray-200"> 
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-3">{greeting}</h2> 
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ItemList products={products} onAdd={handleAdd} resetItemCount={resetItemCount} /> 
      )}
    </div>
  );
}

export default ItemListContainer;
