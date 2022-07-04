import React from 'react'

function Card(props) {
  const { 
    id, 
    student_id, 
    product_name, 
    product_image, 
    description, 
    price, 
    createdAt, 
    updatedAt
  } = props;
  const time = new Date(createdAt).toLocaleDateString("en-US");
  return (
    <>
      <div className='col-lg-4 col-md-6'>
          <div className='card'>
            <img src={product_image} class="card-img-top" alt="..." />
            <div class="card-body">
                <h4 class="card-title">{product_name}</h4>
                <h5 class="card-title" style={{ fontWeight: "normal" }}>Rp{price}</h5>
                <p class="card-text">{description} <br/><b>Owner ID:</b> {student_id} <br/><b>Created:</b> {time}</p>
                <a href="#" class="btn btn-primary">Buy Product</a>
            </div>
          </div>
      </div>
    </>
  )
}

export default Card;