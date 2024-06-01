import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'; 

function Item({ product, onAdd, setCartItems }) { // Recibe setCartItems como prop
  const { cartItems } = useContext(CartContext);
  const formattedPrice = product.price.toLocaleString();

  // Buscamos el producto en el carrito para obtener su stock:
  const cartProduct = cartItems.find(item => item.id === product.id);
  const productStock = cartProduct ? cartProduct.stock : product.stock;
  return (
    <li key={product.id} className="item border p-4 rounded-lg shadow-md bg-white">
      <Link to={`/item/${product.id}`} className="block text-inherit no-underline"> 
        <img src={`/images/${product.image}`} alt={product.title} className="w-full h-48 object-contain rounded-lg border-black border-4" />
        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-bold mt-2">${formattedPrice}</p>
      </Link>

      {productStock > 0 ? ( 
        <Link to={`/item/${product.id}`} className="bg-dorado-claro hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mt-4 block text-center">
          Ver más detalles
        </Link>
      ) : (
        <p className="text-red-500 mt-4 text-center">¡Producto sin stock!</p> 
      )}
    </li>
  );
}

export default Item;
