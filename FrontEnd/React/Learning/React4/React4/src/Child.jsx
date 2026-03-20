import React from 'react'
import child from "./Child"
const Child = ({count , counter}) => {
    const clickButtonInc=()=>{
 counter(count+1);

    }

     const clickButtonDec=()=>{
 counter(count-1);
 
};
const Reset=()=>{
counter(count=0);
 
};
  return (
    <div>
        <button onClick={clickButtonInc} >Increment</button>
        <br />
         <button onClick={clickButtonDec} >Decrement</button>
         <br /> 
         <button onClick={Reset} >Reset</button>
       </div>
)}

export default Child;