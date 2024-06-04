import React, { useState, useContext, useEffect } from 'react';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  runTransaction,
  doc,
} from 'firebase/firestore';
import { CartContext } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Checkout() {
  const { cartItems, clearCart, totalPrice } = useContext(CartContext);
  const { user } = useAuth();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [confirmedOrderItems, setConfirmedOrderItems] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await runTransaction(db, async (t) => {
        const orderData = {
          buyer: {
            email: user.email,
          },
          items: cartItems.map(
            ({ id, title, price, quantity, image, selectedOptions }) => ({
              id,
              title,
              price,
              quantity,
              image,
              selectedOptions, // Incluye las opciones seleccionadas en la orden
            })
          ),
          date: serverTimestamp(),
          total: totalPrice,
        };

        try {
          const orderRef = await addDoc(collection(db, 'Orders'), orderData);
          setOrderId(orderRef.id);
          await Promise.all(
            cartItems.map(async (item) => {
              const itemRef = doc(db, 'ItemCollection', item.id);
              const itemDoc = await t.get(itemRef);

              if (
                itemDoc.exists() &&
                itemDoc.data().stock >= item.quantity
              ) {
                await t.update(itemRef, {
                  stock: itemDoc.data().stock - item.quantity,
                });
              } else {
                throw new Error(
                  `No hay suficiente stock de ${item.title}`
                );
              }
            })
          );
        } catch (error) {
          console.error('Error en la transacción:', error);
          setError(error.message);
          throw error;
        }
      });

      setConfirmedOrderItems(cartItems);
      clearCart();
      setShowOrderSummary(true);
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      if (!error.message) {
        setError(
          'Hubo un error al procesar tu orden. Por favor, inténtalo de nuevo más tarde.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="checkout-form-container p-8 bg-white rounded-lg shadow-md w-auto md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Checkout
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Resumen de la orden */}
        {user && showOrderSummary && (
          <div className="order-confirmation w-full p-4">
            <h3 className="text-lg font-semibold mb-2 text-center">
              ¡Gracias por tu compra!
            </h3>
            <p className="mb-4 text-center">
              Tu número de orden es: {orderId}
            </p>
            <div className="order-summary border border-gray-300 p-4 rounded-md">
              <h4 className="text-md font-semibold mb-2">
                Resumen de la compra:
              </h4>
              <ul className="grid grid-cols-1 gap-4">
                {/* Aplicamos grid aquí también */}
                {confirmedOrderItems.map((item) => (
                  <li
                    key={item.id}
                    className="border p-4 rounded-md"
                  >
                    {/* Estilos para cada item */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Grid dentro de cada item */}
                      <img
                        src={`/images/${item.image}`}
                        alt={item.title}
                        className="w-full h-auto object-cover rounded-md"
                      />
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-base font-medium">
                            {item.title}
                          </p>
                          {/* Mostrar opciones seleccionadas */}
                          {Object.entries(item.selectedOptions).map(([key, value]) => (
                            <p key={key} className="text-sm text-gray-500">
                              {key}: {value}
                            </p>
                          ))}
                          <p className="text-sm text-gray-500">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <p className="text-base font-medium text-gray-800 text-right">
                          $
                          {(item.quantity * item.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <hr className="my-4 border-gray-300" />
              <div className="flex justify-between items-center text-lg font-semibold">
                <p>Total:</p>
                <p>
                  $
                  {confirmedOrderItems
                    .reduce(
                      (total, item) =>
                        total + item.price * item.quantity,
                      0
                    )
                    .toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <Link
                to="/"
                className="bg-dorado-claro hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              >
                {/* Estilos del otro botón */}
                Volver al inicio
              </Link>
              <Link
                to="/orders"
                className="bg-dorado-claro hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              >
                Ir a mis órdenes
              </Link>
            </div>
          </div>
        )}

        {!showOrderSummary && user && (
          <div className="order-preview w-full p-4">
            <div className="order-summary border border-gray-300 p-4 rounded-md">
              <h4 className="text-md font-semibold mb-2">
                Resumen de la compra:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Grid para items */}
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="border p-4 rounded-md"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <img
                        src={`/images/${item.image}`}
                        alt={item.title}
                        className="w-full h-auto object-cover rounded-md"
                      />
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-base font-medium">
                            {item.title}
                          </p>
                          {/* Mostrar opciones seleccionadas */}
                          {Object.entries(item.selectedOptions).map(([key, value]) => (
                            <p key={key} className="text-sm text-gray-500">
                              {key}: {value}
                            </p>
                          ))}
                          <p className="text-sm text-gray-500">
                            Cantidad: {item.quantity}
                          </p>
                        </div>
                        <p className="text-base font-medium text-gray-800 text-right">
                          $
                          {(item.quantity * item.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <hr className="my-4 border-gray-300" />
              <div className="flex justify-between items-center text-lg font-semibold">
                <p>Total:</p>
                <p>${totalPrice.toLocaleString()}</p>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-dorado-claro hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-4 w-full"
            >
              {loading
                ? 'Procesando...'
                : `Comprar como ${user.email}`}
            </button>
          </div>
        )}

        {!user && (
          <div className="text-center mt-4 w-full p-4">
            <p className="text-gray-600">
              Debes iniciar sesión o registrarte para continuar con
              la compra.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/signin"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Registrarse
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;

