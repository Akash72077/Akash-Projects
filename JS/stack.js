// function savetoDB(data, success, failure){
// let internetSpeed= Math.floor(Math.random()*10)+1;
// if(internetSpeed>4){
// success();
// }
// else{
//   failure();
// }
// }
// savetoDB(
//   "Sai",
//   ()=>{
//   console.log("Your data was saved");
// savetoDB("Hello world", ()=>{
//   console.log("Success2: data2 saved");
//   savetoDB(
//     "Akash",
//     ()=>{
//     console.log("Success3: data3 saved");    
//   },
//   ()=>{
//     console.log("Failure 3: weak connection");    
//   })  
// }, 
// ()=> {
//   console.log("Failure 2: weak connection");
// }
// )
// },
// ()=>{
//   console.log("Weak connection. data was not saved");
// });
function savetoDB(data){
return new Promise((success, failure)=>{
let internetSpeed= Math.floor(Math.random()*10)+1;
if(internetSpeed>4){
  success("Success: data was saved");
}else{
  failure("Failure : weak connection");
      }
  });
}
let request = savetoDB("Akash");
request.then(()=>{
  console.log("Data1 saved . Promise was resolved")
  savetoDB("Sai").then(()=>{
    console.log("data2 was saved ");
    return savetoDB("Venkata");
  });
})
.catch(()=>{
  console.log("Promise was rejected ");

})
// savetoDB("Akash");