import React, { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock, initial = 0, onAdd }) => {
  const [count, setCount] = useState(initial);
  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="item-count">
      <div className="controls flex items-center justify-between">
        <button onClick={decrement} className="button decrement" disabled={count === 0}> 
          -
        </button>
        <span className="count text-xl">{count}</span>
        <button onClick={increment} className="button increment" disabled={count >= stock}>
          +
        </button>
      </div>
      <button onClick={() => onAdd(count, setCount)} className="add-to-cart button" disabled={count === 0 || count > stock}> 
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
