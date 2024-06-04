import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase';

const auth = getAuth(app);

function SignIn() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleConfirmEmailChange = (e) => setConfirmEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones básicas
    if (email !== confirmEmail) {
      setError('Los correos electrónicos no coinciden.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Puedes guardar los datos adicionales (nombre, apellido, teléfono) 
      // en Firestore u otro lugar si lo necesitas.
      navigate('/'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="auth-container bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Registrarse</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <input 
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={handleNameChange}
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dorado-claro" 
          />
          <input 
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={handleLastNameChange}
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dorado-claro" 
          />
          <input 
            type="tel"
            placeholder="Teléfono"
            value={phone}
            onChange={handlePhoneChange}
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dorado-claro" 
          />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email} 
            onChange={handleEmailChange} 
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dorado-claro" 
          />
          <input 
            type="email" 
            placeholder="Confirmar correo electrónico" 
            value={confirmEmail} 
            onChange={handleConfirmEmailChange} 
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dorado-claro" 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={handlePasswordChange} 
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dorado-claro" 
          />
          <input 
            type="password" 
            placeholder="Confirmar contraseña" 
            value={confirmPassword} 
            onChange={handleConfirmPasswordChange} 
            className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dorado-claro" 
          />
          <button 
            type="submit" 
            className="auth-button bg-dorado-claro hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-500 font-medium hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
