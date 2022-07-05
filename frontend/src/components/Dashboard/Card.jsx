import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Card(props) {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const {
    id,
    student_id,
    product_name,
    product_image,
    description,
    price,
    createdAt
  } = props;
  const time = new Date(createdAt).toLocaleDateString("en-US");

  const refreshToken = async () => {
    const response = await axios.get('http://localhost:8080/token');
    setToken(response.data.response.accessToken);
  }

  const buyProduct = async () => {
    if (!token) {
      setMessage("You're not authorized to buy product, please login!")
    } else {
      await axios.delete('http://localhost:8080/api/v1/products/' + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.location.reload();
    }
  }

  useEffect(() => {
    refreshToken();
  });

  return (
    <>
      <div className='col-lg-4 col-md-6'>
        <div className='card'>
          <img src={product_image} class="card-img-top" alt="..." />
          <div class="card-body">
            <h4 class="card-title">{product_name}</h4>
            <h5 class="card-title" style={{ fontWeight: "normal" }}>Rp{price}</h5>
            <p class="card-text">{description} <br /><b>Owner ID:</b> {student_id} <br /><b>Created:</b> {time}</p>
            <button onClick={buyProduct} class="btn btn-primary">Buy Product</button> <br />
            <span className='text-danger'>{message}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;