import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './LoginForm.css';
import { FaUser, FaLock, FaGlassMartiniAlt } from 'react-icons/fa';
import login from '../services/auth';

const LoginForm = ({ handleLogin }) => {
  const [formData, setFormData] = useState({ usermail: '', password: '' });
  const [error, setError] = useState({errorMessage: '', errorStatus: ''});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(formData.usermail, formData.password);
      handleLogin();
      setLoggedIn(true);
    } catch (error) {
      setError({errorMessage: error.message, errorStatus: error.response.status});
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  if (loggedIn) {
    return <Navigate to='/product' />;
  }

  return (
    <div className='login-main-container row h-100 w-100'>
      <div className='col-7 vh-100 d-flex aling-items-center'>
        <form className='m-auto wrapper' onSubmit={handleSubmit}>
          <div className='d-flex justify-content-center aling-items-center'>
            <FaGlassMartiniAlt className = 'glass-icon-login' />
          </div>
          <h1>BAR API</h1>

          <div className="input-box">
            <input type="text" name="usermail" placeholder="Mail" value={formData.usermail} onChange={handleChange} required />
            <FaUser className='icon' />
          </div>

          <div className="input-box">
            <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
            <FaLock className='icon'/>
          </div>
          <button type="submit">Iniciar Sesión</button>
          <p className='mt-4'>Aún no tienes cuenta? <a className="register-link" onClick={() => window.location.href = '/register'}>Registrate</a></p>
          {error.errorMessage && <p className="alert alert-danger">{error.errorStatus == 401 ? "Credeciales inválidas" : error.errorMessage}</p>}
        </form>
      </div>
      <div className='login-img-container col-5'>
        <img src="../../public/login-img.jpeg" alt="BAR API" />
      </div>
    </div>
  );
};

export default LoginForm;