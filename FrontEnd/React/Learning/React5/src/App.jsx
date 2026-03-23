import React, { useState } from "react";
import "./App.css";
const App = () => {
  //example-1
  // const isLoggedIN=true;
  // let display;
  // if(isLoggedIN==true){ // example for conditional rendering
  //   display="Welcome to Hyderabad";
  // }
  // example-2
  // const isLoggedIN = true;
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
  // return <div>{isLoggedIN && <button>Logout</button>}
  // </div>;
  // project-1
  const [show, setShow] = useState(false);
  // const handleButton = () => {
  // if (show === true) {
  //   setShow(false);
  // } else {
  //   setShow(true);
  // }
  // setShow(!show); // insted of using if and else we can use (!show) if the input is true then it will become false if false it will become true
  // };
  //this return function is for project 1
  // return (
  //   <div>
  //     <button onClick={()=>setShow(!show)}>{show ? "Hide" : "Show"}</button>
  //     {show && <p>This is a Secret Message!</p>}
  //   </div>
  // );
  // project -2 show / hide app password
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Your Password"
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
};
export default App;
