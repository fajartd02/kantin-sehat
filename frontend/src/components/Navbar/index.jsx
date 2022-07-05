import React from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const refreshToken = async() => {
    const response = await axios.get('http://localhost:8080/token');
    console.log(response.data);
  }

  return (
    <>
      <button onClick={refreshToken} className='btn btn-primary'>Get Token</button>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container'>
          <Link to="/" style={{ textDecoration: "none" }}>
            <a class="navbar-brand" href="#">Kantin Sehat</a>
          </Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link to="/" style={{ textDecoration: "none" }}>
                  <a className="nav-link active">Dashboard</a>
              </Link>
              <Link to="/product" style={{ textDecoration: "none" }}>
                  <a className="nav-link active">Add Product</a>
              </Link>
              <Link to="/balance" style={{ textDecoration: "none" }}>
                  <a className="nav-link active">Balance Box</a>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                  <a className="nav-link active">Login</a>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                  <a className="nav-link active">Register</a>
              </Link>
            </div>
          </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar;