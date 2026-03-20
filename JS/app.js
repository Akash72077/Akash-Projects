// console.log("Hello world!");
// console.log("Sai Akash");
// let a=10;
// let b=5;
// let sum=a+b;
// console.log("Sum is: "+sum);
// let pencil=10;
// let pen=15;
// console.log("The total price is:",pen+pencil, "Rupees ");
// console.log(`The price of pencil is : ${pencil} Rupees`);
// === it checks the value and its type 
// example is :
// console.log("123"==123);// here it check only value not type
// console.log("123"===123);// but in this case it check value and its type
// console.log("Before if statement. ");
// let age=21;
// if(age>18){
//     console.log("Eligible to vote");
// }
// console.log("After if statement");
// let firstname="Akash"
// if(firstname=="Akash"){
//     console.log(`Welcome ${firstname}`);
// }
// let colour= "Red";
// if(colour=="Red"){
// console.log("Stop");
// }else if(colour=="Yellow"){
//     console.log("Wait");
// }else if(colour=="Green"){
//     console.log("Go");  
// }else{
//     console.log("Invalid option");  
// }
// let Size="XL";// popcorn
// if(Size=="XL"){
//     console.log("Price is 250");
// }
// else if(Size=="L"){
//     console.log("Price is 200");  
// }
// else if(Size=="M"){
//     console.log("Price is 100");
// }
// else if(Size=="S"){
//     console.log("Price is 50"); 
// }
// else{
//    console.log("Invalid size");
// }
// let str= "akash";
// let len=str.length;
// console.log(len);
// firstLetter= str.charAt(0);
// console.log(str.charAt(0));
// if(len>3 && firstLetter=="a" ){
//     console.log("Good String ");
// }else{
//     console.log("not a good string");
// }
// let num=12;
// if((num%3==0)&& (num+1==15)|| (num-1==11)){
//     console.log("Safe");
// }else{
//     console.log("Unsafe");
// }

// if(true){
//     console.log("It is true")
//  }  else{
//     console.log("it is false");
// }

// let number=1;
// if(number>0){
//     console.log("The number is positive");
// }else{
//     console.log("The number is negative");
// }
// let colour= "red";
// switch (colour) {
//     case "red":
//         console.log("Stop");
//         break;
//     case "Yellow":
//         console.log("Slow down");
//         break;
//     case "Green": 
//         console.log("Go");
//         break;
//     default:
//         console.log("Broken Light");
//         break;
// }
// alert("DANGER");
// console.error("this is an error message");
// console.warn("this is an error message");

// let firstName= prompt("Enter Your name: ");
// console.log(`His first name is: ${firstName}`);
// num=prompt("Enter a number");
// if(num%10==0){
//     console.log("Good");
// }else{
//     console.log("Bad");
    
// }
// let name=prompt("Enter User's name: ");
// let age=prompt("Enter User's Age: ");
// alert(`${name} is ${age} years old.`);

// let quarter= parseInt(prompt("Enter Quarter"));
// switch(quarter){
//     case 1:
//         console.log("January, February, March");
//     break;
//     case 2:
//         console.log("April , May June");
//     break;
//     case 3:
//         console.log("July, August , September ");
//         break;
//     case 4:
//         console.log("October , November , December");
//         break;
//     default:
//         console.log("Invalid Option.");
      
// }
// let quarter= prompt("Enter Quarter");
// switch(quarter){
//     case "1":
//         console.log("January, February, March");
//     break;
//     case "2":
//         console.log("April , May, June");
//     break;
//     case "3":
//         console.log("July, August , September ");
//         break;
//     case "4":
//         console.log("October , November , December");
//         break;
//     default:
//         console.log("Invalid Option.");
      
// }
// let str= prompt("Enter a string");
// let firstLetter= str[0];
// let length= str.length;
// if((firstLetter=='A'||firstLetter=='a') && length>5 ){
//     console.log(`${str} is golden string`);
// }else{
//     console.log(`${str} is not golden string`);
    
// }
// let str1= "32";
// let str2="47852";
// if(str1[str1.length-1]==str2[str2.length-1]){
//     console.log("Both has same last digit");
// }else{
//     console.log("Different last digit");
// }
// let msg="     Hello     ";
// console.log(msg);

// console.log(msg.trim()); // trim function is used to remove extra spaces from two ends 
// String methods
// toUpperCase() & toLowerCase;
// let str= "akash";
// let str2="SAI";
// console.log(str.toUpperCase());
// console.log(str2.toLowerCase());
// let str= "Dudigam Venkata Sai Akash";
// let position= str.indexOf("b");
// console.log(position);
// let part=str.slice(-5); // if we pass -ve number it prints from last 
// console.log(part);  slice is used to print the strings with-in the range 
// In replace function it searches and replaces with the new string example is below
// let replaceExample= str.replace("Akash", "Ganesh");
// console.log(replaceExample);
// repeat String returns a Strinf with the number of copies of a string 
// example below
// let str="Apple ";
// returnExample= str.repeat(3); // now return Example contians 3 apples like "AppleAppleApple"
// console.log(returnExample);

// Practice questions : 
// let msg= "help!";
// let upperMsg= msg.trim().toUpperCase();
// console.log(upperMsg);
// let name = "Sai Akash";
// console.log(name.slice(4,9));
// console.log(name.indexOf("Ak"));
// console.log(name.replace("Akash", "Ganesh"));

// let student1= "Akash";
// let student2="Sai";
// let student3= "Venkata";
// let students= ["Venkata", "Sai","Akash"];// in java Script lanugage while storing values in array we can store different types of values inside of arrays
// let info=["Akash", 19, 95.6]// these is the example for storing differnt data types on array
// let emptyArr=[]; // this is the example for declaring empty array
// info[0][0];// it access the first element first index letter 
// let cars= ["audi", "Bmw", "maruthi", "xuv"]
// cars.push("Toyato");// it adds the element at the last index
// cars.pop();// it deletes the element from the last index
// cars.unshift("Toyota");// it adds the element at first (0 index)
// cars.shift();// it removes and prints the first index element in an array
// let start=["january", "july", "march", "august"];
// let final=start.shift();
// final=final.shift();
// final=final.unshift("june");
// final=final.unshift("july");
// for(let i=0; i<5; i++){
//     console.log("Hello, "+ i);
// }
// console.log(process.argv);
// let args= process.argv; it stores the number of process are prints
// for( let i=2; i<args.length; i++){
//     console.log("Hi & hello to ", args[i]);
// }
// let students= ["Venkata", "Sai", "Akash"];
// let result= students.indexOf("VEn");
// let result= students.includes("Sai");
// console.log(result)



// const item={
//     price: 100.5,
//     discount: 20,
//     colour: ["white", "blue"]
// };
// const post={
//     username: "@Akash",
//     content:"This is my first post",
//     like: 100,
//     reposts: 7,
//     tags: ["@sai", "Venkata"]// here array indicates mutliple tags 

// };
// let student= {
//     name: "Akash",
//     marks: 95.9
// }; // to get student name student["name"] or student.name
// const obj={
//     1: "a",
//     2: "b",
//     true: "c",
//     undefined: "d",
//     null: "e"
// };

// const student= {
//     name: "Akash",
//     age:18,
//     marks: 88.88,
//     city:"Hyderabad"
// };
// nested objects 
// const classInfo= {
//     sai: {
//         grade: "A+", 
//         city:"Hyderabad"
//     },
//     Akash:{
//         grade: "A",
//         city: "khammam"

//     },
//     venkata:{
//         grade: "A",
//         city:"Vijayawada"
//     }

// };
// Array of objects 
// const classInfo= [
//     {
//         name:"Sai",
//         grade: "A+", 
//         city:"Hyderabad"
//     },
//    {
//          name: "Akash",
//         grade: "A", 
//         city:"Khammam"
//     },
//     {
//          name: "venkata",
//          grade: "A",
//          city:"Delhi"
//     }
// ];
// Math objects 
// absolute denoted by abs it gives exact value example Math.abs(12) mainly it converts negative number to positive number
// let num= Math.random(); 
// num*=10;
// num= Math.floor(num);
// num+=1;
// the below code represents the guessing game 
// const maximum= prompt("Enter the maximum number");

// const random = Math.floor(Math.random()*maximum)+1;

//  let guess= prompt("Guess the number or enter 'quit' to exit ");
//  while(true){
//     if(guess=="quit"){ 
//         console.log("User quit");
//         break;
//     }
//     if(guess==random){
//         console.log("You are right ! Congrats! random number was", random);
//         break;
//     }else if(guess>random){
//         guess= prompt("Hint: Your guess is too large . please try again");
//         // these hints also similar to binary search if we enter the guess middle value of maximum it will tell should we enter number greater or smaller than present guess
        
    
//     }else{
//         guess = prompt("Hint: Your guess is too small. please try again");
//     }
//     // else{
//     //    guess= prompt("Your guess is wrong. Please try again");
//     // }
//  }
// pratice question : program that genreates a random number reperesenting a dice 
// roll The numver should in between 1 to 6
// const maximum =6;
// const random= Math.floor(Math.random()*maximum)+1;
// console.log(random);
// const car={
//     name: "Toyata",
//     model: "Crysta",
//     colour:"white"
// };


// const person ={
//     name: "Sai",
//     age: 18,
//     city: "Hyderabad"
// };


// function hello() {
//     console.log("hello");
    
// }
// hello(); 
// function to create a dice 
// function roll(){
// const dice = Math.floor(Math.random()*6)+1;
// console.log(dice);

// }

// roll();

// function dice(){
// return Math.floor(Math.random()*6)+1;
// }
// console.log(dice());
// function printName(name,age){
//     console.log("My name is: ", name);
    
// }
// printName("akash")
// function avg(a, b,c){
//     return (a+b+c)/3;
// }
// //let Sum= sum(10,20)
// console.log(`Sum of the numbers is ${avg(10,20,30)}`);
// program to print the table for a given number 
// function printTable(n){
//     for(let i=1; i<=10; i++){
//         console.log(n +"*"+ i+"="+ n*i);
//     }
// }

// let number = prompt("Which table ypu want")
// printTable(number);
// code that returns the sum of numbers from 1 to n 

// function printSum(n){
//     let  sum =0;
//     for(let i=1; i<=n; i++){
//         sum+=i;
//     }
//     return sum;
// }


// n= prompt("Enter a number: ");
// console.log(`Sum of the ${n} numbers is ${printSum(n)}`);

// printSum(n);
// function concat(str){
//     let result;
//     for(let i=0; i<str.length; i++){
//         result+= " "+str[i];
//     }
//     return result;
// }
// let str= ["Hi", "Hello ", "bye", "!"]
// console.log(`The resultant string is ${concat(str)}`);
// function calSum(a,b){

// }
// let greet = "hello";
// function changeGreet(){
//     let greet = "Namasthe";
//     console.log(greet);
//     function innerGreet(){
//         console.log(greet);
//     }
// }
// console.log(greet);
// changeGreet();
// the output will be :  hello Namasthe 
// const sum = function (a, b){
//     return a+b;
// }
// console.log(sum(2,5));
// function mutlipleGreet(func , count){// Higher order function we will pass function in another function
//     for(let i=1; i<=count; i++){
//         func();
//     }
// }
// let greet = function(){
//     console.log("hello");

// }
// mutlipleGreet(greet , 5);


// function oddOrEvenFactory(request){
//     if(request=="odd"){
// let odd = function(n){
//     console.log(!(n%2==0));
    
// }

// return odd;
//     }
//     else if(request=="even"){
        
// let even = function(n){
//     console.log(n%2==0);
// }
//     return even;
        
//     }
//     else{
//         console.log("wrong request");
        
//     }
// }
// let request = "even";
// let func= oddOrEvenFactory(request);
// const calculator={
//      num:53,
//     add(a,b){
//         return a+b;
//     },
//     sub(a,b){
//         return a-b;
//     },
//     mul(a,b){
//         return a*b;
//     }
// };
// program to print largest element in array
// function Biggest(array){
//     let largest= array[0];
//     for(let i=1; i<array.length; i++){
//         if(array[i]>largest){
//             largest=array[i];
//         }
//     }
//     return largest;
// }
// let array=[5,6,4,7,3,9];
// let biggest=Biggest(array);
// console.log(biggest);
// function unique(str){
// let newStr="";
// for(let i=0; i<str.length; i++){
// if(!newStr.includes(str[i])){
//     newStr+=str[i];
// }
// }
// return newStr;
// }
// str="abcdabcdefgggh";
//  let newStr= unique(str);
//  console.log(newStr);
// const student ={
//     name: "Akash",
//     age: 19, 
//     phy: 89,
//     math: 90,
//     eng: 98,
//     getAvg(){
//         let avg= (this.eng+this.math+this.phy)/3;
//         console.log(`${this.name} got Average marks= ${avg}`);
//     }
// }
// student.getAvg();
// console.log("Hello");
// console.log("Hello");
// console.log("Hello");
// console.log(a);
// console.log("Hello2");
// console.log("Hello2");
// console.log("Hello2");
// let a=19;
// console.log("Hello");
// console.log("Hello");
// console.log("Hello");
// try {
    
// console.log(a);

// } catch (error) {
//     console.log("Variable a does n't exist");
    
// }
// console.log("Hello2");
// console.log("Hello2");
// console.log("Hello2");
// console.log(Math.e);
// arrow functions can be used in highorder function as parameter passing 
// arrow fucntions are name less functions 
// const sum= (a, b)=>{
//     console.log(a+b);
// };
// const cube = (n)=>{
//     return n*n*n;
// };
// const pow= (a,b)=>{
//     return a**b;
// };
// const mul=(a,b)=>(a*b /* implicit return it return a * b automatically */);

// console.log("hello Everyone.");
// setTimeout(()=>{
//     console.log("Sai akash");
// }, 4000);
// console.log("My name is ");
// console.log("hello Everyone.");
// setTimeout(()=>{
//     console.log("Sai akash");
// }, 4000);// 4000 means 4 seconds 
// console.log("My name is ");
// setTimeout is used to execute the block of program after the given time 
// as well  as setInterval is used to execute and out execute repeatly with in the given time interval

// let id = setInterval(()=>{
//     console.log("Hello world");
// }, 2000);
// console.log(id);
// const student = {
//     name:"Akash",
//     marks: 90,
//     prop: this,// global scope 
//     getName:  function (){
//         console.log(this);
//         return this.name;
//     },
//     getMarks: ()=> {
//          console.log(this);
//         return this.marks;
//     }
// };
// let arr= [1,2,3,4,5,6];
// let print = function(el){
//     console.log(el);
// };
// arr.forEach(print);
// arr.forEach(function(el) {
//     console.log(el)
// });
// arr.forEach((el) => {
//     console.log(el);
// });

// let student= [
//     {
//     name: "Akash",
//     marks: 98,
// }, 
// {
//     name: "Venkata",
//     marks: 88.88,
// }, 
// {
//     name: "Sai",
//     marks: 95.6,
// },
// ];
// map function is used to create a new arr of same size and store the data on it

// let gpa = student.map((el) => {
//     return el.marks/10;

// });

// arr.forEach((student)=>{
//     console.log(student);
    
// })
// let num= [1,2,3,4,5,6];
// let double= num.map(function(el){
//     return el*2;

// });
// let double = num.map((el)=> {
//     return el* 2;

// });
// filter function is used to create a new arr based on the condtion passed on it 
// let nums = [1,3,4,5,6,7,4,5,7,8,4,8,9,23,54,66,74,55];
// let even = nums.filter((el) =>{
//     return el%2==0;
// });
// every function return true id every element of array gives true for some function . Else returns false.
// example [2,4,6].every((el) =>(el%2==0));
// let arr= [1,2,3,4,5];
// let sum= arr.reduce((res,el)=> (res+el));
// console.log(sum);

// reduce function reduces the array to a single value based on the condition
// example [1,2,3,4,5].reduce((res,el) => (res+el) );
// let nums = [1,2,3,4];
// let finalValue= nums.reduce((res, el) => { 
//     console.log(res);
//         return (res+el);
//     });
// console.log(finalValue);
// maximum number in array using functions
// let arr= [1,2 ,3,4,5, 6,72,5,4 ,66];
// let max=-1;
// arr.forEach(element => {
//     if(max<element){
//         max= element;
//     }
// });
// console.log(max);
// maximum number of the array using reduce function 
// let arr= [1,2 ,3,4,5, 6,72,5,4 ,66];
// let ans= arr.reduce((max, el )=>{
//     if(max<el){
//         return el;
//     }else{
//         return max;
//     }
// });
// console.log(ans);
// let arr= [10, 20, 80,40];
// // let result= arr.every((ele)=> (ele%10==0))
// let min= arr.reduce((min, ele)=>{
//     if(min<ele){
//         return min;
//     }else{
//         return ele;
//     }
// })
// console.log(min);
// function sum(a, b=2){
//     return a+b;

// }
// console.log(sum(5));
// let arr= [1,2,3,2,1,3,4,5,3,2,5,6,4,2,0,8,6,4,4,3,6,8];
// let min= Math.min(...arr);
// console.log(min);

// console.log("Akash");
// console.log(..."Akash"); ... is used to spread the array or strings 
// let  arr= [1,2,4,5,6];
// let newArr=[ ...arr];
// console.log(newArr);
// let chars= [..."Akash"];
// console.log(chars);
// let even = [2, 4, 6, 8, 10];

// let numns = [...even, ...odd];
// console.log(numns);
// const data={  // spread using objects
//     email: "Akash@gmail.com",
//     password:"Akash@1234",
// };
// const dataCopy= {...data, id:123, College: "CMR"};
// let odd= [1, 3, 5, 7, 9];
// let obj1= {...odd};


// rest : allows a function to take an definite number of arguments and bundle them in an array
//  function sum(...args){ // aruguments 
//     for(let i=0; i<args.length; i++){
//     console.log("You give us", args[i]);

//     }
// }
// function min(){
//     console.log(arguments.length);
    
// // }
// function min(...args){
//     return args.reduce((min, el)=> {
//         if(min>el){
//             return el;
//         }else{
//             return min;
//         }

//     });
// }
// let small = min(5,4,2,5,0,3,100,-10,6);
// console.log(small);
// Destructuring : Storing values of array into multiple variables
// here we use sqaure brackets []
// let names = ["Akash", "Sai", "Venkata", "Ganesh", "abc", "pqr"];
// let [winner , runnerup, ...others]= names;
// console.log(winner, runnerup, others);
// destructuring object here we use flower brackets{}
// const student={
//     name: "Akash",
//     age: 19,
//     class: 10,
//     sujects:["Maths","Hindi", "Telugu", "English","Science"],
//     username:"Akash@72077",
//     password:"Akash@12345"
// };
// let {username: user, password}= student;

// let arr= [1,3,4,5,6,7,8];
// let newArr= arr.map((num)=> num+5);
// console.log(newArr);
// let arr= ["sai", "akash", "venkata"];
// let newArr= arr.map((ch)=>ch.toUpperCase());
// console.log(newArr);
// function doubleAndReturnArgs(arr, ...args){
//     let double = args.map(numbers=> numbers*2);
//     return [...arr, ...double];
// }
// console.log(doubleAndReturnArgs([1,2,3,4], 5,6,7,8,9,10))
// function mergeObjects(obj1, obj2){
//     return {...obj1, ...obj2};
// }
// console.log(mergeObjects({a:1,b:2,c:3}, {d:4, e:5, f:6, g:7}))
// let nums= [1,2,4,5,6,7,7];
// const sqaure = nums.map((num)=> num* num);
// console.log(sqaure);
// let sum = sqaure .reduce((acc, ele)=> acc+ele, 0);
// console.log(sum);
// let avg= sum/nums.length;
// console.log(avg);


