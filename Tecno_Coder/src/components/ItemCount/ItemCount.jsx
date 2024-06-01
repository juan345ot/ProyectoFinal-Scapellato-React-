import React, { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock, initial = 0, onAdd }) => {
  const [inputValue, setInputValue] = useState(initial);
  const [count, setCount] = useState(initial);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 0; 
    setInputValue(value); 
  };

  const increment = () => {
    if (count < stock) {
      setCount(count + 1);
      setInputValue(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setInputValue(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (inputValue > stock) {
      alert(`Superaste el stock disponible. Stock máximo: ${stock}`);
    } else if (inputValue > 0){
      onAdd(inputValue); 
      setCount(0);
      setInputValue(0); 
    }
  };

  return (
    <div className="item-count">
      <div className="controls flex items-center justify-between">
        <button onClick={decrement} className="button decrement" disabled={count === 0}>
          -
        </button>
        <input 
          type="number" 
          className="count text-xl w-20 text-center" 
          value={inputValue} 
          onChange={handleInputChange}
          min="0" 
        />
        <button onClick={increment} className="button increment" disabled={count >= stock}>
          +
        </button>
      </div>
      <button 
        onClick={handleAddToCart} 
        className="add-to-cart button" 
        disabled={inputValue === 0 || inputValue > stock || stock === 0} 
      > 
        Agregar al carrito
      </button>
    </div>
  );
};
export default ItemCount;
