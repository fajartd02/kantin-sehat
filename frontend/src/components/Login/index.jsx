import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault(); 
    const response = await axios.post('http://localhost:8080/auth/login', {
        student_id: studentId,
        password: password,
    });
    const { status_code } = response.data.meta;
    const notExist = 401;
    if(status_code === notExist) {
      setMessage("Please enter correct username and password!");
    } else {
      navigate("/");
    }
  }
  return (
    <div className='container text-center' style={{marginTop: "12.5%"}}>
    <h2 className='mb-4 text-success'>Login</h2>
      <form className="box" onSubmit={Auth}>
        <p className='text-danger'>{message}</p>
        <div className="field mt-2">
          <label className='label'>Student ID</label>
          <div className="controls">
            <input
              type="text"
              className='input'
              placeholder='Username'
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
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
          <button className='btn btn-lg btn-success mb-3'>Login</button>
        </div>
        <Link to="/register">Dont have an account? <u>Regist here</u></Link>
      </form>
    </div>

  );
}

export default Login;