import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import './ItemDetail.css';

function ItemDetail({ product }) { 
  const { cartItems, addItem, setCartItems } = useContext(CartContext); // Añade setCartItems
  const [itemCount, setItemCount] = useState(0);

  const cartProduct = cartItems.find(item => item.id === product.id);
  const productStock = cartProduct ? cartProduct.stock : product.stock;
  const handleAdd = (quantity) => {
    setItemCount(quantity);
    addItem(product, quantity);
  };

  const formattedPrice = product.price.toLocaleString();

  return (
    <div className="item-detail grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white rounded-xl shadow-md overflow-hidden w-full">
      <div className="item-detail-image">
        <img src={`/images/${product.image}`} alt={product.title} className="w-full h-auto object-cover rounded-lg border-black border-4" />
      </div>
      <div className="item-detail-info p-4">
        <h2 className="text-2xl font-bold mb-8 text-center lg:text-left">{product.title}</h2>
        <p
          className="text-lg font-bold mb-4 text-right"
          style={{
            backgroundColor: '#dorado-claro', 
            padding: '2px 4px',
            borderRadius: '4px'
          }}
        >
          ${formattedPrice}
        </p>
        <p className="text-gray-800 mt-4 mb-6 max-h-48 overflow-y-auto">
          {product.detailedDescription}
        </p>
        {productStock > 0 ? ( // Usamos productStock 
          <div>
            {productStock < 11 && ( // Usamos productStock 
              <p className="text-yellow-500 mb-2">¡Últimas {productStock} unidades!</p>
            )}
            <ItemCount
              stock={productStock} 
              initial={0}
              onAdd={handleAdd}
              setCartItems={setCartItems} // Pasa setCartItems a ItemCount
            />
          </div>
        ) : (
          <p className="text-red-500">¡Producto sin stock!</p>
        )}

        {itemCount > 0 && ( 
          <div className="mt-4 flex justify-center gap-4">
            <Link to="/">
              <button className="bg-dorado-claro hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                Seguir comprando
              </button>
            </Link>
            <Link to="/cart">
              <button className="bg-black hover:bg-gray-800 text-dorado-claro font-bold py-2 px-4 rounded">
                Terminar compra
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDetail;
