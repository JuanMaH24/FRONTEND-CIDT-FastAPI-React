import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash, FaSignOutAlt, FaList, FaSearch } from 'react-icons/fa';
import './ProductHome.css';
import ProductHome from './ProductHome';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [searchThisProduct, setSearchThisProduct] = useState('');
    const navigate = useNavigate();

    
    const handleSearch = () => {
        localStorage.setItem('searchProduct', searchThisProduct);
    };
    
    const handleChange = (event) =>{
        setSearchThisProduct(event.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    const handleUser = () => {
        navigate('/user');
        window.location.reload();
    };

    const handleProduct = () => {
        navigate('/product');
        window.location.reload();
    };

    return (
    <>
        <nav className="Navbar">
            <a href='/product' className="Navbar-left">
                <h1>Bar API</h1>
                <p>Hola, {currentUser.username}</p>
            </a>
            <form className="d-flex" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Nombre del Producto" name="product_name" value = {searchThisProduct} onChange={handleChange} aria-label="Search"></input>
                <button className="btn btn-secondary" type="submit"><FaSearch /></button>
            </form>
            <div className="Navbar-right">
                <button title = "Opciones" className="me-2 btn btn-secondary nav-button" id="btn-options"  data-bs-toggle="modal" data-bs-target="#modalOptions">
                <FaList />
                </button>
            </div>
        </nav>
        <div className="modal fade" id="modalOptions" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{currentUser.username}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body aling-items-center">
                        <button className="modal-nav-link nav-link btn text-secondary " data-bs-dismiss="modal" aria-label="Close" onClick={handleProduct}><strong>Ver productos</strong></button>
                        <button className="modal-nav-link nav-link btn text-secondary " data-bs-dismiss="modal" aria-label="Close" onClick={handleUser}><strong>Ver usuarios</strong></button>
                        {/*
                        <a className="nav-item nav-link text-secondary" href="{{ url_for('routeSales') }}"><b>Historial Ventas</b></a>
                        <a className="nav-item nav-link text-secondary" href="{{ url_for('routeUserSales', id = current_user.user_id) }}"><b>Mi historial</b></a>
                        <a className="nav-item nav-link text-secondary" href="{{ url_for('usersLog') }}"><b>Usuarios</b></a>
                        <a className="nav-item nav-link text-secondary" href="{{ url_for('routeupdateUser') }}"><b>Editar Perfil</b></a>
                        <div className="d-flex justify-content-end">
                            <a className="btn btn-secondary " href="{{ url_for('logout') }}">Logout</a>
                        </div> */}
                        <div className='d-flex justify-content-end'>
                            <button title = "Cerrar Sesión" className="btn btn-secondary nav-btn logout-btn" data-bs-dismiss="modal" aria-label="Close" onClick={handleLogout}>
                                <FaSignOutAlt />
                            </button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Navbar;
