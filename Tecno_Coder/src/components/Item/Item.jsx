import React from 'react';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';

function Item({ product, onAdd, resetItemCount }) {
  const formattedPrice = product.price.toLocaleString(); 
  return (
    <li key={product.id} className="item border p-4 rounded-lg shadow-md bg-white">
      <Link to={`/item/${product.id}`} className="block text-inherit no-underline"> 
        <img src={`/images/${product.image}`} alt={product.title} className="w-full h-48 object-contain rounded-lg border-black border-4" />
        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-bold mt-2">${formattedPrice}</p>
      </Link>
      <ItemCount stock={product.stock} initial={product.count || 0} onAdd={onAdd} resetItemCount={resetItemCount} />
      <Link to={`/item/${product.id}`} className="bg-dorado-claro hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mt-4 block text-center">
        Ver más detalles
      </Link>
    </li>
  );
}

export default Item;
