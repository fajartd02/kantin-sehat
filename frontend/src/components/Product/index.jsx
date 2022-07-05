import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function Product() {
  const [studentId, setStudentId] = useState('');
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const navigate = useNavigate();

  const refreshToken = async () => {
    const response = await axios.get('http://localhost:8080/token');
    setToken(response.data.response.accessToken);
    const decoded = jwt_decode(response.data.response.accessToken);
    const { exp, userId } = decoded;
    setExpire(exp);
    setStudentId(userId);
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

  const uploadData = async (e) => {
    e.preventDefault();
    console.log("upload")
    setPrice(parseFloat(price));
    const response = await axiosJWT.post("http://localhost:8080/api/v1/products", {
      student_id: studentId,
      product_name: productName,
      product_image: "/assets/img/2.jpg",
      description: description,
      price: price
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
  }

  useEffect(() => {
    refreshToken();
  }, [])

  return (
    <>
      <Navbar />
      <div className='container text-center'>
        <h3 className='text-success mt-2'>Add Product</h3>
        <form className="box" onSubmit={uploadData}>
          <div className="field mt-2">
            <label className='label'>Product Name</label>
            <div className="controls">
              <input
                type="text"
                className='input'
                placeholder='Username'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>
          <div className="field mt-2">
            <label className='label'>Price (IDR)</label>
            <div className="controls">
              <input type="text"
                className='input'
                placeholder='price IDR'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="field mt-2">
            <label className='label'>Description</label>
            <div className="controls">
              <input type="text"
                className='input'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="field mt-5">
            <button className='btn btn-lg btn-success mb-3'>Buy Products</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Product;