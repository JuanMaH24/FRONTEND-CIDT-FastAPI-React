import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaRobot, FaPlusCircle } from 'react-icons/fa';
import Navbar from './Navbar.jsx';
import ProductCard from './ProductCard.jsx';
import HomeCarrusel from './HomeCarrusel.jsx';
import axios from 'axios';
import './ProductHome.css';

const ProductHome = ()=> {
  const searchThisProducts = localStorage.getItem('searchProduct');
  const [products, setProducts] = useState([]);
  const [formDataProduct, setFormDataProduct] = useState({product_name: '', product_price: '' });
  const [error, setError] = useState({errorMessage: '', errorStatus: ''});
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProducts = async () => {
      console.log(searchThisProducts);
      if(!searchThisProducts){
        try {
          const response = await axios.get('http://localhost:8000/product', {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          });
          setProducts(response.data);
        } catch (error) {
          console.error('Error al obtener los productos:', error);
          setError(error.message);
        }
      }else{
        try {
          const response = await axios.get('http://localhost:8000/product/name/',{
            params: {
              product_name: searchThisProducts
            },
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          });
          setProducts(response.data);
          localStorage.removeItem('searchProduct');
        } catch (error) {
          console.error('Error al obtener los productos:', error);
          setError({errorMessage: error.message, errorStatus: error.response.status});
          localStorage.removeItem('searchProduct');
        }
      }
    }

    fetchProducts();
  }, []);


  const handleNewProduct = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `http://localhost:8000/products`,
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
      console.log({
        user_name: formDataUser.user_name,
        user_mail: formDataUser.user_mail, 
        rol:       formDataUser.rol,
        password:  formDataUser.password
      });
      setError({errorMessage: error.message, errorStatus: error.response.status});
      console.error('No se pudo crear el usuario:', error);
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


  return (
    <div className="products-container">
      <Navbar />
      {error.errorMessage &&
        <div className="d-flex w-50 m-auto mt-5 justify-content-between flex-column alert alert-danger" role="alert">
        <FaRobot className='m-auto mb-2 error-robot-icon' />
        <span className='m-auto'><strong>{error.errorStatus == 404 ? "Producto no encontrado" : error.errorMessage}</strong></span>
        </div>
        }
      <div className="content">
        <HomeCarrusel />
        <div className="row">
          <ProductCard products={products} />
        </div>
      </div>
      {currentUser.rol.toUpperCase() == "ADMIN" ? <button className='plus-button btn' id="btn-product-user"  data-bs-toggle="modal" data-bs-target="#new-product-modal">
        <FaPlusCircle className='plus-button-icon' />
      </button> : <></>}

      <div className="modal fade" id="new-product-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Producto nuevo</h1>
            <button type="button" className="btn-close" onClick = {handleEditClose} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(event) => handleNewProduct(event)}>
              <label>Nombre del producto</label>
              <input type="text" className="form-control mb-3" name="product_name" placeholder="Nombre del producto" value = {formDataProduct.product_name} onChange={handleChange} required></input>
              <label>Precio del producto</label>
              <input type="numer" min={0} className="form-control mb-3" name="product_price" placeholder="Precio del producto" value = {formDataProduct.product_price} onChange={handleChange} required></input>
              <button type="submit" className ="btn btn-secondary">Crear</button>
            </form>
          </div>
      </div>
      </div>
    </div> 
    </div>
  );
};

export default ProductHome;