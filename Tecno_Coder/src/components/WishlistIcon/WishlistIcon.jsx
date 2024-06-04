// components/WishlistIcon/WishlistIcon.jsx
import React, { useContext, useState } from 'react'; // Importa useState
import { WishlistContext } from '../../context/WishlistContext'; 
import './WishlistIcon.css'; 

function WishlistIcon({ product, isProductInWishlist }) { 
  const { addWishlistItem, removeWishlistItem } = useContext(WishlistContext);
  const [isActive, setIsActive] = useState(isProductInWishlist); // Estado para la clase active

  const handleClick = () => {
    if (isProductInWishlist) {
      removeWishlistItem(product.id);
    } else {
      addWishlistItem(product);
    }
    setIsActive(!isActive); // Cambia el estado al hacer clic
  };

  return (
    <button 
      onClick={handleClick} // Llama a la función handleClick
      className={`wishlist-icon ${isProductInWishlist ? 'filled' : ''} ${isActive ? 'active' : ''}`} 
    >
      {/*  Icono SVG  */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-6 h-6"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

export default WishlistIcon;
