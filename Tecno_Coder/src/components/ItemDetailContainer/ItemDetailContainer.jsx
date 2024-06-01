import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../mock/asyncMock';
import ItemDetail from '../ItemDetail/ItemDetail';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    getProductById(itemId)
      .then(product => {
        setProduct(product);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  return (
    <div className="item-detail-container flex flex-col items-center justify-center min-h-screen px-4 py-8"> 
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl overflow-y-auto border-red-500"> 
        {loading ? (
          <p>Cargando detalle del producto...</p>
        ) : product ? (
          <ItemDetail product={product} />
        ) : (
          <p>Producto no encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default ItemDetailContainer;
