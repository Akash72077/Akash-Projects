import React from 'react'
import "./Profile.css"
const profile = () => {

   const name="D.Akash";
  const age=19;
   const country="India";
   const phone_number=9988663353;
   const email="sai.sai72077@gmail.com"



  return (
    
    <div className='card'>
      <h3>Name: {name}</h3>
      <p>Age: {age}</p>
      <p>Country: {country} </p>
      <h2>Phone no: {phone_number}</h2>
      <h2>Email id : {email}</h2>
      <button className='btn'>Click &#128070; </button>
      
    </div>
  )
}

export default profile