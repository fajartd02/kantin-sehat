import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import jwt_decode from "jwt-decode"
import axios from "axios"

function BalanceBox() {
  const [token, setToken] = useState('');
  const [studentId, setStudentId] = useState('');
  const [expire, setExpire] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshToken = async () => {
    setLoading(true);
    const response = await axios.get('http://localhost:8080/token');
    setToken(response.data.response.accessToken);
    const decoded = jwt_decode(response.data.response.accessToken);
    const { userId, exp } = decoded;
    setStudentId(userId);
    setExpire(exp);
  }

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) { // expired access token
      const response = await axios.get('http://localhost:8080/token');
      config.headers.Authorization = `Bearer ${response.data.response.accessToken}`;
      setToken(response.data.response.accessToken);
      const decoded = jwt_decode(response.data.response.accessToken);
      const { userId, exp } = decoded;
      setStudentId(userId);
      setExpire(exp);
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  });

  const getBalanceBox = async () => {
    setLoading(true);
    const response = await axiosJWT.get('http://localhost:8080/api/v1/balance', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data.response);
    setLoading(false);
  }

  useEffect(() => {
    refreshToken();
    getBalanceBox();
  })
  return (
    <>
      <Navbar />
      <div className='container text-center'>
        <h1 className='text text-lg text-success mt-5'>Balance Box</h1>
        {!token &&
          <>
            <h4 className='text text-md text-danger mt-3'>You're not authorized to see canteen balance box!</h4>
            <Link to="/login">
              <button className='btn btn-lg btn-primary mt-3'>Login Now!</button>
            </Link>
          </>}
        {(token && loading) && <h1>Loading...</h1>}
        {(token && !loading) &&
          <>
            <h1>Rp{balance}</h1>
            <button className='btn btn-primary mt-5' style={{marginRight: '16px'}}>Add Money</button>
            <button className='btn btn-success mt-5'>Withdraw Money</button>
          </>
        }

      </div>
    </>
  )
}

export default BalanceBox