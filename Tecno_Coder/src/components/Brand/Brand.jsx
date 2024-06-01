import React from 'react';
import { Link } from 'react-router-dom';
import './Brand.css';
function Brand() {
  return (
    <Link to="/" className="brand-link">
      <h1 className="brand text-xl md:text-2xl lg:text-3xl mb-4">
        Tecno<span className="coder">-Coder</span>
      </h1>
    </Link>
  );
}

export default Brand;
