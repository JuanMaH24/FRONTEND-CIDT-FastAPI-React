import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaRobot, FaPlusCircle } from 'react-icons/fa';
import Navbar from './Navbar.jsx';
import HomeCarrusel from './HomeCarrusel.jsx';
import axios from 'axios';
import './ProductHome.css';

const ProductCard = ({products})=> {

  const [formDataProduct, setFormDataProduct] = useState({product_name: '', product_price: '' });
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const handleEditProduct = async (productId, event) => {
    event.preventDefault();
    try {
        await axios.put(
        `http://localhost:8000/products/${productId}`,
        {
            product_name: formDataProduct.product_name,
            product_price: formDataProduct.product_price
        },
        {
            headers: {
            Authorization: `Bearer ${currentUser.token}`
            }
        }
        );
        window.location.reload();
    } catch (error) {
        console.error('No se pudo actualizar el producto:', error);
    }
    };
    
    const handleDeleteProduct = async (productId, event) => {
    event.preventDefault();
    try {
        await axios.delete(
        `http://localhost:8000/products/${productId}`,
        {
            headers: {
            Authorization: `Bearer ${currentUser.token}`
            }
        }
        );
        window.location.reload();
    } catch (error) {
        console.error('No se pudo eliminar el producto:', error);
    }
    };
    
    const handleChange = (event) => {
    setFormDataProduct({
        ...formDataProduct,
        [event.target.name]: event.target.value,
    });
    };
    
    const handleEditClose = () => {
    setFormDataProduct({
        product_name: '',
        product_price: ''  
    });
    };

    return(
        <>
        {products.map(products => (
        <div key={products.id} className="col-md-3">
            <div>
            <div className="product-card card shadow m-3">
                <div className="card-block">
                    <img className = "card-img" alt="productImage" src="../../public/ron2.jpeg"></img>
                    <h5 className="card-title mt-3 mx-3">
                        {products.product_name} 
                    </h5>
                    <h5 className="card-title mx-3">
                        Precio: <b><i>{products.product_price}</i> COPS</b>
                    </h5>
                    {currentUser.rol.toUpperCase() == "ADMIN" ? <div className="d-flex flex-row justify-content-between m-3">
                    <button className="btn btn-secondary btn-sm" id={`btn-edit${products.id}`}  data-bs-toggle="modal" data-bs-target={`#modal${products.id}`}>Editar <FaEdit /></button>
                    <button className="btn btn-danger btn-transition btn-sm" type="submit" onClick={(event) => handleDeleteProduct(products.id, event)}>Borrar <FaTrash /></button>
                    </div> : <></>}
                </div>
            </div>
        </div>
    
    
        <div className="modal fade" id={`modal${products.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{products.product_name}</h1>
                <button type="button" className="btn-close" onClick = {handleEditClose} data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={(event) => handleEditProduct(products.id, event)}>
                    <label>Nuevo nombre del Producto</label>
                    <input type="text" className="form-control mb-3" name="product_name" placeholder={`${products.product_name}`} value = {formDataProduct.product_name} onChange={handleChange} required></input>
                    <label>Nuevo precio del Producto</label>
                    <input type="number" className="form-control mb-3" name="product_price" placeholder={`${products.product_price}`} value = {formDataProduct.product_price} onChange={handleChange} min={0} required></input>
                    <button type="submit" className ="btn btn-secondary">Guardar</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    ))}
    </>);
}

export default ProductCard;