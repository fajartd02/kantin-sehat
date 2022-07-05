import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    const validCharacter = 5;
    if(studentId.length != validCharacter) {
      setMessage("ID should 5 character!");
    } else {
      const response = await axios.post('http://localhost:8080/auth/register', {
        student_id: studentId,
        password: password,
      });
      const { status_code } = response.data.meta;
      const notValid = 422;
      const alreadyExists = 409;
      if(status_code === notValid) {
        setMessage("Please enter valid ID!");
      } else if(status_code === alreadyExists) {
        setMessage("Account already exists!");
      } else {
        navigate("/login");
      }
    }
  }
  
  return (
    <div className='container text-center' style={{marginTop: "12.5%"}}>
    <h2 className='mb-4 text-success'>Register</h2>
      <form className="box" onSubmit={Register}>
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
          <button className='btn btn-lg btn-success mb-3'>Register</button>
        </div>
      </form>
    </div>

  );
}

export default Register;