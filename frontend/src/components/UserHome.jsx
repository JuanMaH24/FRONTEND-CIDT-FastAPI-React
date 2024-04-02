import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSignOutAlt, FaPlusCircle } from 'react-icons/fa';
import Navbar from './Navbar.jsx';
import axios from 'axios';
import './ProductHome.css';

const UserHome = () => {
  const [users, setUsers] = useState([]);
  const [formDataUser, setFormDataUser] = useState({user_name: '', user_mail: '', rol:'',password: ''});
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const response = await axios.get('http://localhost:8000/user', {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    }

    fetchUsers();
  }, []);

  const handleEditUser = async (userId, event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/users/${userId}`,
        {
          user_name: formDataUser.user_name,
          user_mail: formDataUser.user_mail, 
          rol:       formDataUser.rol,
          password:  formDataUser.password
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );
      window.location.reload();
    } catch (error) {
      console.error('No se pudo actualizar el usuario:', error);
    }
  };

  const handleDeleteUser = async (userId, event) => {
    event.preventDefault();
    try {
      await axios.delete(
        `http://localhost:8000/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );
      window.location.reload();
    } catch (error) {
      console.error('No se pudo eliminar el usuario:', error);
    }
  };

  const handleNewUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `http://localhost:8000/users`,
        {
          user_name: formDataUser.user_name,
          user_mail: formDataUser.user_mail, 
          rol:       formDataUser.rol,
          password:  formDataUser.password
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        }
      );
      window.location.reload();
    } catch (error) {
      console.log({
        user_name: formDataUser.user_name,
        user_mail: formDataUser.user_mail, 
        rol:       formDataUser.rol,
        password:  formDataUser.password
      });
      console.error('No se pudo crear el usuario:', error);
    }
  };

  const handleChange = (event) => {
    setFormDataUser({
      ...formDataUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditClose = () => {
    setFormDataUser({
      user_name: '', user_mail: '', rol:'',password: '' 
    });
  };

  return (
    <>
    <Navbar />
    <div className="card shadow">
    <div className="card-body">

      {currentUser.rol.toUpperCase() == "ADMIN" ? <button className="btn btn-secondary btn-lg m-3" id="btn-new-user"  data-bs-toggle="modal" data-bs-target="#new-user-modal"><strong>Nuevo Usuario</strong></button> : <></>}
        <h5>INFO DE LOS USUARIOS</h5>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Modificar</th>
                </tr>
            </thead>
        
        <tbody>
            {users.map(users => (
              <tr key={users.id}>
              <td>{users.id}</td>
              <td>{users.user_name}</td>
              <td>{users.user_mail}</td>
              <td>{users.rol}</td>
              {currentUser.rol.toUpperCase() == "ADMIN" ? <td className='d-flex flex-row justify-content-end'>
                <button className="me-3 ms- 3 btn btn-secondary btn-sm" id={`btn-edit${users.id}`}  data-bs-toggle="modal" data-bs-target={`#modal${users.id}`}>Editar <FaEdit /></button>
                <button className="me-3 ms- 3 btn btn-danger btn-sm" onClick={(event) => handleDeleteUser(users.id, event)} >Borrar <FaTrash /></button>
              </td> : <></>}
              </tr>
            ))}
        </tbody>

    </table>

    {users.map(users => 
      <div key={users.id} className="modal fade" id={`modal${users.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{users.user_name}</h1>
            <button type="button" className="btn-close" onClick = {handleEditClose} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(event) => handleEditUser(users.id, event)}>
              <label>Cambiar nombre del usuario</label>
              <input type="text" className="form-control mb-3" name="user_name" placeholder={`${users.user_name}`} value = {formDataUser.user_name} onChange={handleChange} required></input>
              <label>Cambiar email del usuario</label>
              <input type="text" className="form-control mb-3" name="user_mail" placeholder={`${users.user_mail}`} value = {formDataUser.user_mail} onChange={handleChange} required></input>
              <label>Cambiar rol del usuario</label>
              <input type="text" className="form-control mb-3" name="rol" placeholder={`${users.rol}`} value = {formDataUser.rol} onChange={handleChange} required></input>
              <label>Ingrese la nueva contraseña</label>
              <input type="password" className="form-control mb-3" name="password" placeholder="Contraseña" value = {formDataUser.password} onChange={handleChange} min={0} required></input>
              <button type="submit" className ="btn btn-secondary">Guardar</button>
            </form>
          </div>
      </div>
      </div>
    </div> 
    )}

    </div>
    <div className="modal fade" id="new-user-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Usuario nuevo</h1>
            <button type="button" className="btn-close" onClick = {handleEditClose} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(event) => handleNewUser(event)}>
              <label>Cambiar nombre del usuario</label>
              <input type="text" className="form-control mb-3" name="user_name" placeholder="Ingrese un nombre" value = {formDataUser.user_name} onChange={handleChange} required></input>
              <label>Cambiar email del usuario</label>
              <input type="text" className="form-control mb-3" name="user_mail" placeholder="Ingrese un email" value = {formDataUser.user_mail} onChange={handleChange} required></input>
              <label>Cambiar rol del usuario</label>
              <input type="text" className="form-control mb-3" name="rol" placeholder="Ingrese su rol" value = {formDataUser.rol} onChange={handleChange} required></input>
              <label>Ingrese la nueva contraseña</label>
              <input type="password" className="form-control mb-3" name="password" placeholder="Contraseña" value = {formDataUser.password} onChange={handleChange} min={0} required></input>
              <button type="submit" className ="btn btn-secondary">Crear</button>
            </form>
          </div>
      </div>
      </div>
    </div> 
</div>  
</>);
};

export default UserHome;