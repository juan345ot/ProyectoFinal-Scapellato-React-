import React from 'react';
import './CategoryList.css';
import { Link } from 'react-router-dom';
function CategoryList() {
  const categories = [
    { name: 'Computadoras/Notebooks', to: '/category/computadoras-notebooks' },
    { name: 'Celulares/Tablets', to: '/category/celulares-tablets' }, 
    { name: 'Televisores/Monitores', to: '/category/televisores-monitores' },
    { name: 'Accesorios', to: '/category/accesorios' }
  ];
  return (
    <div className="category-list text-center mx-auto max-w-full md:max-w-screen-md lg:max-w-screen-lg">
      <ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"> 
        {categories.map(category => (
          <li key={category.name} className="border p-4 rounded-lg shadow-md">
            <Link to={category.to} className="category-link">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
