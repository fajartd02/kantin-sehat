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
  const [inputBalance, setInputBalance] = useState('');
  const [message, setMessage] = useState('');
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
    setBalance(response.data.response.balance)
    setLoading(false);
  }

  const addMoney = async () => {
    let amount = parseFloat(inputBalance);
    const response = await axiosJWT.post('http://localhost:8080/api/v1/balance', {
      balance: amount
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { after_added_balance } = response.data.response
    setBalance(after_added_balance)
    setMessage("Success for add balance!");
  }

  const withdrawMoney = async () => {
    let amount = parseFloat(inputBalance);
    if (amount > balance) {
      setMessage("Balance not enough!");
    } else {
      setMessage("Success for withdraw balance!");
      amount *= -1;
      const response = await axiosJWT.post('http://localhost:8080/api/v1/balance', {
        balance: amount
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { after_added_balance } = response.data.response
      setBalance(after_added_balance)
    }
  }

  useEffect(() => {
    refreshToken();
    getBalanceBox();
  }, []);

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
            <h1>Rp{balance}</h1> <br />
            <input type="text"
              className='input center'
              placeholder='amount'
              value={inputBalance}
              onChange={(e) => setInputBalance(e.target.value)}
            />
            <br />
            <button className='btn btn-primary mt-5' style={{ marginRight: '16px' }} onClick={addMoney}>Add Money</button>
            <button className='btn btn-success mt-5' onClick={withdrawMoney}>Withdraw Money</button>
            <h5 className='text-danger mt-3'>{message}</h5>
          </>
        }

      </div>
    </>
  )
}

export default BalanceBox