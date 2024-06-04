// components/Item.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../context/WishlistContext';
import WishlistIcon from '../WishlistIcon/WishlistIcon';

function Item({ product }) {
  const { isProductInWishlist } = useContext(WishlistContext); 
  return (
    <li className="item-card bg-white p-4 rounded-lg shadow-md overflow-hidden flex flex-col"> 
      <Link to={`/item/${product.id}`}>
        <img 
          src={`/images/${product.image}`} 
          alt={product.title} 
          className="item-image w-full h-48 object-center object-contain rounded-lg border-black border-2 mb-4" 
        /> 
      </Link>
      <div className="item-info flex-grow"> 
        <div className="flex justify-between items-center"> 
          <h3 className="item-title text-lg font-semibold mb-2">
            <Link to={`/item/${product.id}`}>{product.title}</Link> 
          </h3>
          <WishlistIcon 
            product={product} 
            isProductInWishlist={isProductInWishlist(product.id)} 
          />
        </div>
        <p className="item-price text-gray-800">${product.price.toLocaleString()}</p>
      </div>
      {/* Botón "Ver Detalle" */}
      <Link to={`/item/${product.id}`} className="bg-dorado-claro py-2 px-4 rounded-md text-black font-bold text-center hover:bg-yellow-400 mt-auto"> 
        Ver Detalle
      </Link>
    </li>
  );
}
export default Item;
