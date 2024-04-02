import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import ProductHome from './components/ProductHome.jsx';
import UserHome from './components/UserHome.jsx';
import './App.css';

export function App() {
  const isTokenSaved = Boolean(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenSaved);

  const handleLogin = () => {
    setIsLoggedIn(true);
    return <Navigate to='/product' />;  
  };

  return (
    <Router>
      <div className='App'>
        <Routes>
          {/* Ruta protegida para el home */}
          <Route
            path='/product'
            element={isLoggedIn ? <ProductHome /> : <Navigate to='/' />}
          />
          <Route
            path='/user'
            element={isLoggedIn ? <UserHome /> : <Navigate to='/' />}
          />
          {/* Ruta para el formulario de inicio de sesión */}
          <Route
            path='/'
            element={isLoggedIn ?  <Navigate to='/product' /> : <LoginForm handleLogin={handleLogin} />}
          />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}
