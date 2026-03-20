showName=()=>{
name= document.getElementById("nameBox").value;
document.getElementById("output").innerText="hello "+name+" Welcome to JS";

}
function isEven(num){
    if(num%2==0){
        return "even";
    }else{
        return "odd";
    }
}
Check=()=>{
let num=document.getElementById("number").value;
res=isEven(num);

document.getElementById("out").innerText="Number is "+res;
}

function CalPrice(num){
    if(num<5 && num>0){
        return "free";
    }else if(num>5 && num<17){
        return 20;
    }
    else if(num>=17 & num<=100){
        return 50;
    }else{
        return undefined;
    }
}

ticketPrice=()=>{
let age=document.getElementById("age").value;
let pric=CalPrice(age);

document.getElementById("price").innerText="Price of the ticket is: "+pric;
}

function DiceRoll(){
    return Math.floor(Math.random()*6)+1;
}

function CalRounds(round){
    let sum=0;
 for(let i=0; i<round; i++){
    sum+=DiceRoll();
 }
 return sum;
}


Roll=()=>{
    let round=document.getElementById("rounds").value;
    let sum = CalRounds(round);
    document.getElementById("ans").innerText="Sum is: "+sum;

}


const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;



Calculate=()=>{
   let a=parseFloat( document.getElementById("first").value);
    let b= parseFloat(document.getElementById("second").value);
    let option= document.getElementById("action").value;
    
    let answer;
    if(option=="add"){
        answer =add(a,b);
    }else if(option=="sub"){
         answer =sub(a,b);
    } else if(option=="mul"){
        answer = mul(a,b);
    }else if(option=="div"){
         answer =div(a,b);
    }else{
        document.getElementById("result").innerText = "Invalid option";
        return;
    }
     document.getElementById("result").innerText =
        "The result is: " + answer;
}

