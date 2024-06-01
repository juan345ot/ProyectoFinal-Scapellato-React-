import React from 'react';
import Item from '../Item/Item';

function ItemList({ products, onAdd, resetItemCount }) { 
  return (
    <ul className="item-list grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0 w-full">
      {products.map(product => (
        <Item 
          key={product.id} 
          product={product} 
          onAdd={(quantity, setCount) => onAdd(quantity, product, setCount)}
          resetItemCount={resetItemCount} 
        />
      ))}
    </ul>
  );
}

export default ItemList;
