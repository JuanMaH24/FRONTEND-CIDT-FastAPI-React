import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [usermail, setUsermail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users', {
        user_name: username,
        user_mail: usermail,
        password: password
      });
      if (response && response.data) {
        navigate('/');
        window.location.reload();
      } else {
        console.error('Error registering user: Response or data is undefined');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      } else if (error.request) {
        console.error('No response received');
      } else {
        console.error('Error setting up the request:', error.message);
      }
      setError('Error registering user. Please try again.');
    }
  };

  return (
    <div className='login-main-container row h-100 w-100'>
    <div className='col-7 vh-100 d-flex aling-items-center'>
    <div className="m-auto wrapper">
      <h1>BAR API</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="input-box">
      <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-box">
      <input type="text" placeholder="Mail de usuario" value={usermail} onChange={(e) => setUsermail(e.target.value)} />
      </div>
      <div className="input-box">
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Crear usuario</button>
    </div>
    </div>
    <div className='login-img-container col-5'>
        <img src="../../public/login-img.jpeg" alt="BAR API" />
      </div>
    </div>
  );
};

export default RegisterForm;