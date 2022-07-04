import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault(); // agar page tidak reload
    try {
      await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });

      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.message);
      }
    }
  }
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="columns is-4-desktop">
              <form className="box" onSubmit={Auth}>
                <p className='has-text-centered has-text-danger'>{msg}</p>
                <div className="field mt-2">
                  <label className='label'>Email or Username</label>
                  <div className="controls">
                    <input
                      type="text"
                      className='input'
                      placeholder='Username'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className='label'>Password</label>
                  <div className="controls">
                    <input type="password"
                      className='input'
                      placeholder='******'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className='button is-success is-fullwidth'>Login</button>
                </div>
                <Link to="/register">Dont have an account? <u>Regist here</u></Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;