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
// import { useState } from "react";
// const App = () => {
//   const [name, setName] = useState("");
//   const [submittedName, setSubmittedName] = useState();
//   function handleSumbit() {
//     event.preventDefault();
//     setSubmittedName(name);
//   }
//   return (
//     <div>
//       {/* when we submit form in react the page will refreshes automatically To avoid this refresh we have to perform another event that is event.preventDefault();
//        */}
//       <form onSubmit={handleSumbit}>
//         <input
//           type="text"
//           placeholder="Enter Your name:"
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {/*  displaying input data after submit */}
//       <h1>{submittedName}</h1>
//     </div>
//   );
// };
// export default App;

/*
controller components lecture-7
What are controlled components :
A Controlled Components is an input filed whose value is fully controlled by react using state
Without React-> the browser controls the input
With React-> You control the input using useState
*/
// handling mutliple inputs with multiple states
// import React, { useState } from "react";
// import "./App.css";
// export const App = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [submittedEmail, setSubmittedEmail] = useState("");
//   const [submittedPassword, setSubmittedPassword] = useState("");
//   function handleForm(e) {
//     e.preventDefault();
//     setSubmittedEmail(email);
//     setSubmittedPassword(password);
//   }
//   return (
//     <div>
//       <form onSubmit={handleForm}>
//         <input
//           type="email"
//           placeholder="Enter Your Email:"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Enter Your Password:"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <div>
//         <h2>
//           {submittedEmail} - {submittedPassword}
//         </h2>
//       </div>
//     </div>
//   );
// };
// export default App;
//conditonal rendering
// import React, { useState } from "react";
// import "./App.css";
// export const App = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [submittedEmail, setSubmittedEmail] = useState("");
//   const [submittedPassword, setSubmittedPassword] = useState("");
//   function handleForm(e) {
//     e.preventDefault();
//     setSubmittedEmail(email);
//     setSubmittedPassword(password);
//   }
//   return (
//     <div>
//       <form onSubmit={handleForm}>
//         <input
//           type="email"
//           placeholder="Enter Your Email:"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Enter Your Password:"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <div>
//         {submittedEmail && (
//           <h2>
//             {submittedEmail} - {submittedPassword}
//           </h2>
//         )}
//       </div>
//     </div>
//   );
// };
// export default App;
//handling mutliple inputs using one object state
import React, { useState } from "react";
import "./App.css";
export const App = () => {
  const [formData, setFormData] = useState({
    Name:"",
    email: "",
    password: "",
  });
  const [submittedForm, setSubmittedForm] = useState(null);
  function handleChange(event) {
    setFormData({
      ...formData, // spread operator inserts the values into varuables
      [event.target.name]: event.target.value,
    });
  }
  function handleForm(event) {
    event.preventDefault();
    setSubmittedForm(formData);
  }
  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Enter Your Name:"
          onChange={handleChange}
          name="name"
          value={formData.email}
          required
        />
        <input
          type="email"
          placeholder="Enter Your Email:"
          onChange={handleChange}
          name="email"
          value={formData.email}
          required
        />
        <input
          type="password"
          placeholder="Enter Your Password:"
          onChange={handleChange}
          name="password"
          value={formData.password}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {submittedForm && (
          <div>
            <h2>Form Submitted</h2>
            <p>Email: {submittedForm.email}</p>
            <p>Password: {submittedForm.password}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
