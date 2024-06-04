import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';  // Importa db
import ItemList from '../ItemList/ItemList';
import { CartContext } from '../../context/CartContext';
import { addItem } from '../../context/cartHelpers'; // Importa addItem

function ItemListContainer({ greeting }) { 
  const { cartItems, setCartItems } = useContext(CartContext); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null); // Agrega state para categoryId
  const { categoryKey } = useParams(); // Obtiene categoryKey de la ruta
  const location = useLocation(); // Obtiene la ubicación actual

  // useEffect para obtener categoryId (actualizado)
  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        if (categoryKey) { // Si hay una key en la ruta, obtener el ID
          const categoryQuery = query(collection(db, 'Category'), where('key', '==', categoryKey));
          const categorySnapshot = await getDocs(categoryQuery);
          if (!categorySnapshot.empty) {
            const categoryDoc = categorySnapshot.docs[0];
            setCategoryId(categoryDoc.id);
          } else {
            console.log("La categoría no existe");
          }
        } else {
          // Si no hay key (es decir, estamos en la página de inicio), 
          // se resetea el categoryId
          setCategoryId(null);
        }
      } catch (error) {
        console.error('Error fetching categoryId:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryId();
  }, [categoryKey]); // Depende de categoryKey

  // useEffect para obtener productos (actualizado)
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

    // Ejecutar fetchProducts cuando categoryId cambie o la URL de la página cambie
    fetchProducts(); 
  }, [categoryId, location.pathname]); // Depende de categoryId y pathname

  const handleAdd = (quantity, product) => { 
    addItem(cartItems, setCartItems, product, quantity); // Utiliza addItem de cartHelpers
    console.log(`Se agregaron ${quantity} unidades de ${product.title} al carrito`);
  };

  return (
    <div className="item-list-container p-4 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full bg-gray-200">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-3">{greeting}</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ItemList products={products} onAdd={handleAdd} setCartItems={setCartItems} /> 
      )}
    </div>
  );
}

export default ItemListContainer; 
