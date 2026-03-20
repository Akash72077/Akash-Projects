import React, { useState } from 'react'
import Child from './Child';

const App = () => {
 const [count , setCount]=useState(0);
  return (
    <div>   
      <h2>{count}</h2>
      <Child count={count} counter={setCount} />  
    </div>
  )
}

export default App