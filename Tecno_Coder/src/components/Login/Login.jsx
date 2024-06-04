import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../../firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="auth-container bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email} 
            onChange={handleEmailChange} 
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dorado-claro" 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={handlePasswordChange} 
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dorado-claro" 
          />
          <button 
            type="submit" 
            className="auth-button bg-dorado-claro hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Iniciar sesión
          </button>
        </form>
        <button 
          onClick={handleGoogleLogin} 
          className="auth-button google-button bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" className="w-5 h-5" />
          <span>Iniciar sesión con Google</span>
        </button>
        <p className="mt-4 text-center text-gray-600">
          ¿No tienes cuenta? <Link to="/signin" className="text-blue-500 font-medium hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
