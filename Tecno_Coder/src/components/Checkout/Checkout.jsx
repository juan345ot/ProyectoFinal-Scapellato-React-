import React, { useState, useContext } from 'react';
import { db } from '../../main';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  runTransaction, 
  doc 
} from 'firebase/firestore'; 
import { CartContext } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; 

function Checkout() {
  const { cartItems, clearCart, totalPrice } = useContext(CartContext);
  const [buyer, setBuyer] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    confirmEmail: '' 
  });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBuyer({ 
      ...buyer, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validación de correo electrónico y confirmación
    if (!validateEmail(buyer.email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      setLoading(false);
      return;
    } else if (buyer.email !== buyer.confirmEmail) {
      setError('Los correos electrónicos no coinciden.');
      setLoading(false);
      return;
    } 

    try {
      // Iniciar la transacción
      await runTransaction(db, async (t) => { 
        const orderData = {
          buyer,
          items: cartItems.map(({ id, title, price, quantity }) => ({
            id,
            title,
            price,
            quantity,
          })),
          date: serverTimestamp(),
          total: totalPrice,
        };
  
        // Intentar crear la orden y actualizar el stock dentro de la transacción
        try {
          // 1. Crear la orden en Firestore
          const orderRef = await addDoc(collection(db, 'Orders'), orderData);
          setOrderId(orderRef.id); 
          // 2. Actualizar el stock de los productos
          await Promise.all(
            cartItems.map(async (item) => {
              const itemRef = doc(db, 'ItemCollection', item.id);
              const itemDoc = await t.get(itemRef);

              if (itemDoc.exists() && itemDoc.data().stock >= item.quantity) {
                await t.update(itemRef, { stock: itemDoc.data().stock - item.quantity });
              } else {
                // No hay suficiente stock, revertir la transacción
                throw new Error(`No hay suficiente stock de ${item.title}`); 
              }
            })
          );
        } catch (error) {
          // Capturar error dentro de la transacción (por ejemplo, falta de stock)
          console.error("Error en la transacción:", error);
          setError(error.message); // Mostrar un mensaje de error específico
          throw error; // Re-lanzar el error para detener la transacción
        }
      });

      clearCart(); 
    } catch (error) {
      // Capturar errores generales de la transacción 
      console.error('Error al procesar la orden:', error);

      // Mostrar un mensaje de error genérico si no se especificó uno antes
      if (!error.message) {
        setError('Hubo un error al procesar tu orden. Por favor, inténtalo de nuevo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };
  const validateEmail = (email) => { 
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
  }; 
  return (
    <div className="checkout-form-container p-4 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full bg-gray-200">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-3">Completa tus datos</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Order ID confirmation */}
      {orderId && ( 
        <div> 
            <p>¡Tu orden se ha creado con éxito! ID de la orden: {orderId}</p> 
            <Link to="/">Volver al inicio</Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={buyer.name}
          onChange={handleChange}
          required
          className="border border-gray-400 px-3 py-2 rounded-md"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={buyer.phone}
          onChange={handleChange}
          required
          className="border border-gray-400 px-3 py-2 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={buyer.email}
          onChange={handleChange}
          required
          className="border border-gray-400 px-3 py-2 rounded-md"
        />
        <input 
          type="email"
          name="confirmEmail"
          placeholder="Confirmar correo electrónico"
          value={buyer.confirmEmail}
          onChange={handleChange}
          required
          className="border border-gray-400 px-3 py-2 rounded-md"
        />
        <button type="submit" disabled={loading} className="bg-dorado-claro hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
          {loading ? 'Procesando...' : 'Finalizar compra'}
        </button>
      </form>
    </div>
  );
}
export default Checkout;
