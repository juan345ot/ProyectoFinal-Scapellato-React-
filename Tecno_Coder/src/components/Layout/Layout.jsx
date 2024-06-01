import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import Footer from '../Footer/Footer';
import './Layout.css';
function Layout({ children }) {
  return (
    <div className="layout">
      <NavBar />
      <main className="mx-auto p-4 md:max-w-full">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
