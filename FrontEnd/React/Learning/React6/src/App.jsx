import React from "react";
import "./App.css";
const App = () => {
  function clickButton() {
    alert("button clicked!");
  }
  return (
    <div>
      <button onClick={clickButton}>Click</button>
    </div>
  );
};

export default App;
