import React from "react";
import "./App.css";
const App = () => {
  //example-1
  // const isLoggedIN=true;
  // let display;
  // if(isLoggedIN==true){ // example for conditional rendering
  //   display="Welcome to Hyderabad";
  // }
  // example-2
  const isLoggedIN = true;

  // let display;
  // if(isLoggedIN==true){ // example for conditional rendering
  //   display="Logout";
  // }else{
  //   display="Login in"
  // }
  // return (
  //   // <button>{display}</button>
  // )
  // example-3
  // rendering using terinary operator
  // return (
  //   <div>
  //     {isLoggedIN ? <button>logout</button> : <button>Login</button>}
  //   </div>
  // );
  // example-4
  // rendering using and operator it will be used to render when the condition or value of the variable is true
 // for this example the prarical example will be example 1
  return <div>{isLoggedIN && <button>Logout</button>}</div>;
};

export default App;
