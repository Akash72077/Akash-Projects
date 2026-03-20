
import './App.css'

import React from 'react'
import Child from './Components/child';
import pizza from "./assets/pizza.jpg";

const App = () => {
const title="Pizza";
const price=300;


  return (
    <div>
     <Child pizza={pizza} title={title} price={price} />
    </div>
  )
}

export default App