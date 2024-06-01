import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { BrowserRouter } from 'react-router-dom'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <BrowserRouter> {}
      <App /> 
    </BrowserRouter>
  </CartProvider>
);

