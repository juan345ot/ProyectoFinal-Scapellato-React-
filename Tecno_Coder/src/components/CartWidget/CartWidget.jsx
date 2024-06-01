import React, { useContext } from 'react';
import CartIcon from '../CartIcon/CartIcon';
import { CartContext } from '../../context/CartContext';

function CartWidget() {
  const { cartItems } = useContext(CartContext);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="relative">
      <CartIcon width="40" height="40" />
      <span className="absolute bottom-0 right-0 -mb-1 -mr-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
        {totalQuantity}
      </span>
    </div>
  );
}

export default CartWidget;
