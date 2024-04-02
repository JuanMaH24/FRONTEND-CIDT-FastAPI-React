// Esta función se encarga de hacer una petición POST al endpoint /token con las credenciales del usuario y, si todo sale bien, guarda el token en el localStorage.
import axios from 'axios';

const login = async (usermail, password) => {
  try {
    const formData = ({ user_mail: usermail, password: password});

    const response = await axios.post('http://localhost:8000/login', formData);
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    throw error;
  }
};

export default login;