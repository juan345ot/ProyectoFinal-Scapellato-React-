import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import WishlistIcon from '../WishlistIcon/WishlistIcon'; 
import { WishlistContext } from '../../context/WishlistContext'; 
import './ItemDetail.css';

function ItemDetail({ product }) { 
  const { cartItems, addItem } = useContext(CartContext);
  const [itemCount, setItemCount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({}); // Para almacenar las opciones seleccionadas
  const { addWishlistItem, removeWishlistItem, isProductInWishlist } = useContext(WishlistContext);

  const cartProduct = cartItems.find(item => item.id === product.id);
  const productStock = cartProduct ? cartProduct.stock : product.stock;
  
  const handleAdd = (quantity) => {
    setItemCount(quantity);
    addItem(product, quantity, selectedOptions); // Envía las opciones seleccionadas al carrito
  };

  const handleOptionChange = (optionKey, optionValue) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [optionKey]: optionValue,
    }));
  };

  const formattedPrice = product.price.toLocaleString();

  return (
    <div className="item-detail grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white rounded-xl shadow-md overflow-hidden w-full">
      <div className="item-detail-image">
        <img src={`/images/${product.image}`} alt={product.title} className="w-full h-auto object-cover rounded-lg border-black border-4" />
      </div>
      <div className="item-detail-info p-4">
        <div className="flex justify-between items-center"> 
          <h2 className="text-2xl font-bold mb-8 text-center lg:text-left">{product.title}</h2>
          <WishlistIcon 
            product={product} 
            isProductInWishlist={isProductInWishlist(product.id)} 
          /> 
        </div>
        <p
          className="text-lg font-bold mb-4 text-right"
          style={{
            backgroundColor: '#dorado-claro', 
            padding: '2px 4px',
            borderRadius: '4px'
          }}
        >
          {formattedPrice}
        </p>

        {/* Mostrar opciones si existen */}
        {product.options && Object.keys(product.options).map(optionKey => (
          <div key={optionKey} className="mb-4">
            <label htmlFor={optionKey} className="block text-sm font-medium text-gray-700">
              {optionKey}:
            </label>
            <select 
              id={optionKey} 
              onChange={(e) => handleOptionChange(optionKey, e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Selecciona {optionKey}</option>
              {product.options[optionKey].map(optionValue => (
                <option key={optionValue} value={optionValue}>
                  {optionValue}
                </option>
              ))}
            </select>
          </div>
        ))}
        
        <p className="text-gray-800 mt-4 mb-6 max-h-48 overflow-y-auto">
          {product.detailedDescription}
        </p>

        {productStock > 0 ? (
          <div>
            {productStock < 11 && ( 
              <p className="text-yellow-500 mb-2">¡Últimas {productStock} unidades!</p>
            )}
            <ItemCount
              stock={productStock} 
              initial={0}
              onAdd={handleAdd}
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
