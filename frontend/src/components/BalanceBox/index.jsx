import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import jwt_decode from "jwt-decode"
import axios from "axios"

function BalanceBox() {
  const [token, setToken] = useState('');
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  const refreshToken = async () => {
    const response = await axios.get('http://localhost:8080/token');
    setToken(response.data.response.accessToken);
    const decoded = jwt_decode(response.data.response.accessToken);
    const { userId } = decoded;
    setStudentId(userId);
  }

  useEffect(() => {
    refreshToken();
  })
  return (
    <>
      <Navbar />
      <div className='container text-center'>
        <h1 className='text text-lg text-success mt-5'>Balance Box</h1>
        {token && <h1>Hello</h1>}
        {!token && 
        <>
          <h4 className='text text-md text-danger mt-3'>You're not authorized to see canteen balance box!</h4>
          <Link to="/login">
            <button className='btn btn-lg btn-primary mt-3'>Login Now!</button>
          </Link>
        </>}
      </div>
    </>
  )
}

export default BalanceBox