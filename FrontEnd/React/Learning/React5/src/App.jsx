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
  // rendering using terinary operator
  return (
    <div>
      {isLoggedIN ? <button>logout</button> : <button>Login</button>}
    </div>
  );
};

export default App;
