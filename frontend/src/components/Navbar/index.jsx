import React, { useEffect, useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [token, setToken] = useState('');
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  const refreshToken = async () => {
    const response = await axios.get('http://localhost:8080/token');
    const decoded = jwt_decode(response.data.response.accessToken);
    const { userId } = decoded;
    setStudentId(userId);
  }

  useEffect(() => {
    refreshToken();
  })

  return (
    <>


      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container'>
          <Link to="/" style={{ textDecoration: "none" }}>
            <a className="navbar-brand" href="#">Kantin Sehat</a>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" style={{ textDecoration: "none" }}>
                <a className="nav-link">Dashboard</a>
              </Link>
              <Link to="/product" style={{ textDecoration: "none" }}>
                <a className="nav-link">Add Product</a>
              </Link>
              <Link to="/balance" style={{ textDecoration: "none" }}>
                <a className="nav-link">Balance Box</a>
              </Link>
              {!studentId &&
                <>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <a className="nav-link">Login</a>
                  </Link>
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <a className="nav-link">Register</a>
                  </Link>
                </>}

              {studentId &&
                <>
                <Link to="/logout" style={{ textDecoration: "none" }}>
                  <a className="nav-link">Logout</a>
                </Link>
                  <a className="nav-link" style={{position:"absolute", right:"10%"}}>Your ID: {studentId}</a>
                </>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;