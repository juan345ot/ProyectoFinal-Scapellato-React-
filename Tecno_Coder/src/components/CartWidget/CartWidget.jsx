import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import CartIcon from '../CartIcon/CartIcon';
import { CartContext } from '../../context/CartContext';

function CartWidget() {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (totalQuantity === 0) {
    return null;
  }

  return (
    <Link to="/cart" className="relative"> {/* Enlace al carrito */}
      <CartIcon width="40" height="40" />
      <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
        {totalQuantity}
      </span>
    </Link>
  );
}

export default CartWidget;
