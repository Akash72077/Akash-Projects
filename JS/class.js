    console.log("Hello from js");
// let Name =prompt("Enter you name: ");
// console.log(`Welcome ${Name}`);
let  age =19;
console.log(age);
age =20;
console.log(age);
var country="India";
console.log(country);
var country="UK";
console.log(country);
var country="USA";
console.log(country);
// alert("Hello")
// document.write("Hello i am a learner");

// let a=20, b=2;
// console.log(a+b)
// console.log(a*b)
// console.log(a**b);
// let a =prompt("Enter your First Number: ");
// let b =prompt("Enter your Second Number: ");
// document.write(a+b);
// console.log(a+b);

// let a=Number(prompt("Enter your first number: "));
// a+=Number(prompt("Enter second number: "))
// console.log("The sum of first and second number is: "+a);




function dice(){
return Math.floor(Math.random()*6)+1;
}

let btn=document.getElementById("btn");
btn.addEventListener("click", ()=> {
    console.log(dice());
})
 
// let Name =prompt("Enter you name: ");
// document.write(`Welcome ${Name}`);

// document.getElementById("output").innerHTML = `Welcome ${Name}`;
let Name =prompt("Enter your name: ");
let Age =prompt("Enter your age: ");
let city =prompt("Enter your City: ");
document.getElementById("name").innerHTML = `Welcome ${Name}`;
document.getElementById("age").innerHTML = `Age is ${Age}`;
document.getElementById("city").innerHTML = `From ${city}`;
console.log(`Welcome ${Name}`);
console.log(`Age is ${age}`);
console.log(`From ${city}`);





