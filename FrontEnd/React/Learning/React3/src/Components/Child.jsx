import React from 'react'
import "./Child.css";
const child = (prop) => {
  return (
    <div className='card'>
      <img src={prop.pizza} alt="Image not found" />
      <p>{prop.title}</p>
      <p>{prop.price}/-</p>
      <button>Order Now</button>
    </div>
  )
}

export default child