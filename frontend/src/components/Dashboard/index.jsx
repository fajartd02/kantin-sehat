import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import axios from "axios";
import Card from './Card';

function Dashboard() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async() => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/products');
      setProducts(response.data.response.product);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        <div className='row'>
          {products.map((product, index) => (
            <Card 
            key={product.id}
            id={product.id}
            student_id={product.student_id}
            product_name={product.product_name}
            product_image={product.product_image}
            description={product.description}
            price={product.price}
            createdAt={product.createdAt}
            updatedAt={product.updatedAt}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Dashboard;