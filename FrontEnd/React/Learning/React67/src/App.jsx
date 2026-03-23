//on click events
// import React from "react";
// import "./App.css";
// const App = () => {
//   function clickButton(name) {
//     alert(`Hello ${name}`);
//   }
//   return (
//     <div>
//       <button onClick={()=>clickButton("Akash")}>Click</button>
//     </div>
//   );
// };

// export default App;

//On change event for input
// import React, { useState } from "react";
// import "./App.css";
// const App = () => {
//   const [text, setText] = useState("");
//   return (
//     <div>
//       <input
//         type="text"
//         id="input"
//         placeholder="Enter Your Name..."
//         onChange={(e) => setText(e.target.value)}
//       />
//       <h2>{text}</h2>
//     </div>
//   );
// };
// export default App;

// On submit events for forms
import React from "react";
import { useState } from "react";
const App = () => {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName]=useState();
  function handleSumbit() {
    event.preventDefault();
    setSubmittedName(name);
  }
  return (
    <div>
      {/* when we submit form in react the page will refreshes automatically To avoid this refresh we have to perform another event that is event.preventDefault();
       */}
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          placeholder="Enter Your name:"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {/*  displaying input data after submit */}
      <h1>{submittedName}</h1>
    </div>
  );
};
export default App;
