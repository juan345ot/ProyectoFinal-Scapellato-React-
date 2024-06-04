// ItemDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Importa db 
import ItemDetail from '../ItemDetail/ItemDetail';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'ItemCollection', itemId); // Cambiado a const docRef para mayor claridad
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() }); // Se agregó el id del producto
        } else {
          console.log("El producto no existe"); 
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  return (
    <div className="item-detail-container flex flex-col items-center justify-center min-h-screen px-4 py-8"> 
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl overflow-y-auto border-red-500"> 
        {loading ? (
          <p>Cargando detalle del producto...</p>
        ) : product ? (
          <ItemDetail product={product} stock={product.stock} /> 
        ) : (
          <p>Producto no encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default ItemDetailContainer;
