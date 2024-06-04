import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CategoryList from '../CategoryList/CategoryList';
import CartWidget from '../CartWidget/CartWidget';
import Brand from '../Brand/Brand';

function NavBar() {
  const { user, loading, handleSignOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className="navbar flex flex-col md:flex-row justify-between items-center p-4 bg-dorado-claro shadow-md rounded-lg">
      <Brand />
      <CategoryList />
      <div className="flex items-center">
        {/* Agrega el enlace a la wishlist con el icono de corazón */}
        <Link to="/wishlist" className="relative ml-4 mr-4"> {/* Agrega mr-4 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </Link>

        <CartWidget />
        {/* User menu */}
        <div className="relative ml-4" onClick={toggleDropdown}>
          <button className="flex items-center focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl">
              {loading ? (
                <p className="text-sm text-gray-500 text-center py-2">Loading...</p>
              ) : (
                <Fragment>
                  {user ? (
                    // Options for logged-in users
                    <Fragment>
                      <Link to="/orders" className="block px-4 py-2 text-sm text-dorado-claro bg-gray-800 hover:bg-gray-700 font-bold">
                        Mis Ordenes
                      </Link>
                      <Link to="/wishlist" className="block px-4 py-2 text-sm text-dorado-claro bg-gray-800 hover:bg-gray-700 font-bold">
                        Mi Wishlist
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-dorado-claro bg-gray-800 hover:bg-gray-700 font-bold"
                      >
                        Cerrar sesión
                      </button>
                    </Fragment>
                  ) : (
                    // Options for non-logged-in users
                    <Fragment>
                      <Link to="/login" className="block px-4 py-2 text-sm text-dorado-claro bg-gray-800 hover:bg-gray-700 font-bold">
                        Iniciar sesión
                      </Link>
                      <Link to="/signin" className="block px-4 py-2 text-sm text-dorado-claro bg-gray-800 hover:bg-gray-700 font-bold">
                        Registrarse
                      </Link>
                    </Fragment>
                  )}
                </Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
