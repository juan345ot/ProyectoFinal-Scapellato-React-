// ItemListContainer.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../main';  // Importa db
import ItemList from '../ItemList/ItemList';
import { CartContext } from '../../context/CartContext';

function ItemListContainer({ greeting }) { 
  const { cartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let q = categoryId
          ? query(collection(db, 'ItemCollection'), where('category', '==', categoryId))
          : collection(db, 'ItemCollection');
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]); 
  const handleAdd = (quantity, product) => { 
    console.log(`Se agregaron ${quantity} unidades de ${product.title} al carrito`);
  };
  return (
    <div className="item-list-container p-4 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full bg-gray-200">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-3">{greeting}</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ItemList products={products} onAdd={handleAdd} /> 
      )}
    </div>
  );
}

export default ItemListContainer; 
