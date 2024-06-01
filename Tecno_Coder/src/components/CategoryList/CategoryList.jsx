// CategoryList.jsx
import React, { useState, useEffect } from 'react';
import './CategoryList.css';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../main';  // Importa db desde index.jsx
function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Category')); // Usa db aquí
        const fetchedCategories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []); // Vacío, ya que db se importa y no cambia
  return (
    <div className="category-list text-center mx-auto max-w-full md:max-w-screen-md lg:max-w-screen-lg"> 
      {loading ? ( 
        <p>Cargando categorías...</p> 
      ) : (
        <ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0"> 
          {categories.map(category => (
            <li key={category.id} className="border p-4 rounded-lg shadow-md"> 
              <Link to={`/category/${category.id}`} className="category-link"> 
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryList;
