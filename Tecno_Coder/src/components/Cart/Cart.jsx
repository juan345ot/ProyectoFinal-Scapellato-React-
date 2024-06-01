import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

function Cart() {
  const { cartItems, removeItem, clearCart, totalPrice, decreaseItemQuantity, increaseItemQuantity } = useContext(CartContext);

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseItemQuantity(itemId);
  };
  return (
    <div className="cart-container min-h-screen px-4 py-8 flex flex-col items-center justify-center">
      <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-lg overflow-y-auto">
        <h2 className="cart-title text-xl font-bold mb-4 text-center">Carrito de Compras</h2>
        {cartItems.length > 0 ? (
          <>
            <ul className="cart-items space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={`/images/${item.image}`} alt={item.title} className="cart-item-image w-24 h-24 object-cover rounded-lg border-black border-2" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title text-base font-semibold mb-2">{item.title}</h3>
                    <div className="cart-item-quantity flex items-center text-sm">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l text-xs"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => increaseItemQuantity(item.id)} 
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r text-xs"
                      >
                        +
                      </button>
                    </div>
                    <p className="cart-item-price text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                    <button onClick={() => handleRemoveItem(item.id)} className="cart-item-remove bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total flex justify-between items-center mt-4">
              <button onClick={clearCart} className="cart-clear bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">
                Vaciar Carrito
              </button>
              <p className="cart-total-price text-base font-bold">Total: ${(totalPrice).toLocaleString()}</p>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <Link to="/" className="bg-dorado-claro hover:bg-yellow-500 text-black font-bold py-1 px-2 rounded text-xs">
                Seguir comprando
              </Link>
              <Link to="/cart" className="bg-black hover:bg-gray-800 text-dorado-claro font-bold py-1 px-2 rounded text-xs">
                Terminar compra
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl font-semibold">Tu carrito está vacío.</p>
            <Link to="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Volver a la tienda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
