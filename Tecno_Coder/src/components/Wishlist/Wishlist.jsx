// components/Wishlist.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount'; 

function Wishlist() {
  const { wishlistItems, removeWishlistItem } = useContext(WishlistContext);
  const { addItem } = useContext(CartContext); 

  // Modifica handleAddToCart para recibir la cantidad
  const handleAddToCart = (item, quantity) => { 
    addItem(item, quantity); 
  };

  return (
    <div className="wishlist-container min-h-screen px-4 py-8 flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Mi Lista de Deseos</h2>
        {wishlistItems.length > 0 ? (
          <ul className="wishlist-items space-y-4">
            {wishlistItems.map((item) => (
              <li key={item.id} className="wishlist-item grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/item/${item.id}`}> {/* Enlace a la página del producto */}
                  <img src={`/images/${item.image}`} alt={item.title} className="item-image w-full h-48 object-center object-contain rounded-lg border-black border-2 mb-4" />
                </Link>
                <div className="wishlist-item-details">
                  <h3 className="wishlist-item-title text-base font-semibold mb-2">{item.title}</h3>
                  <p className="wishlist-item-price text-sm">${item.price.toLocaleString()}</p>
                  <div className="mt-2">
                    {/* Pasa la cantidad a handleAddToCart */}
                    <ItemCount stock={item.stock} initial={0} onAdd={(quantity) => handleAddToCart(item, quantity)} /> 
                  </div>
                  <button onClick={() => removeWishlistItem(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs mt-2">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl font-semibold">Tu lista de deseos está vacía.</p>
            <Link to="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Volver a la tienda
            </Link>
          </div>
        )}

        {/* Botón Volver al inicio */}
        <div className="flex justify-center space-x-4 mt-4"> 
          <Link to="/" className="bg-dorado-claro hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
