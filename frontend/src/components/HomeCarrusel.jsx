import React, { useState, useEffect } from 'react';
import './ProductHome.css';

const HomeCarrusel = ()=> {

    return (
        <div id="carouselExampleInterval" className="home-carousel carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src="../../public/poster3.jpg" className="d-block" alt="..."></img>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="../../public/poster2.jpg" className="d-block" alt="..."></img>
          </div>
          <div className="carousel-item">
            <img src="../../public/poster1.jpg" className="d-block" alt="..."></img>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
}

export default HomeCarrusel;