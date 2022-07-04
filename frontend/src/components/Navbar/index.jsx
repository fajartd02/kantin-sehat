import React from 'react'
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container'>
          <a class="navbar-brand" href="#">Kantin Sehat</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link to="/" style={{ textDecoration: "none" }}>
                  <a className="nav-link active">Home</a>
              </Link>
              <Link to="/balance" style={{ textDecoration: "none" }}>
                  <a className="nav-link active">Balance Box</a>
              </Link>
            </div>
          </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar;