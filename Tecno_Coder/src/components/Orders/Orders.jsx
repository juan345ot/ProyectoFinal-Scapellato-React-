import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom'; // Importa Link

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const ordersRef = collection(db, 'Orders');
          const q = query(ordersRef, where("buyer.email", "==", user.email));
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(ordersData);
        } catch (error) {
          console.error("Error al obtener las órdenes:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = timestamp.toDate();
      return date.toLocaleDateString();
    }
    return "";
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Órdenes</h2>

      {loading ? (
        <p>Cargando órdenes...</p>
      ) : orders.length === 0 ? (
        <p>No tienes ninguna orden todavía.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="bg-white p-4 rounded-lg shadow-md border-4 border-black">
              <div className="flex justify-between items-center mb-4">
                <p className="font-bold">Orden: #{order.id}</p>
                <p className="text-gray-600">{formatDate(order.date)}</p>
              </div>

              <ul className="border-t border-gray-200">
                {order.items.map(item => (
                  <li key={item.id} className="py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <img 
                        src={`/images/${item.image}`} 
                        alt={item.title} 
                        className="item-image w-16 h-16 object-center object-contain rounded-lg border-black border-2 mr-4" // Estilos de Item.jsx
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-800">${(item.quantity * item.price).toLocaleString()}</p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-end">
                <p className="font-bold text-lg">Total: ${(order.total).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Botones con mismos estilos */}
      <div className="flex justify-center space-x-4 mt-4"> 
        <Link to="/" className="bg-dorado-claro hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default Orders;
