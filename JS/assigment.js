// program to count total digits in a number
// let number = 287152;
// let count =0;
// while(number>0){
//     number=Math.floor(number/10);
//     count++;
// }
// console.log("Total digits: " + count);  

// program to sum of all digits in a number
// let number = 287152;
// let sum =0;
// while(number>0){
//     let digit = number % 10;
//     sum+=digit;
//     number= Math.floor(number/10);

// }
// console.log("Sum of digits: " + sum);
// let n=5;
// let factorial=1;
// if(n==0)
//     console.log(0);
    
// for(let i=1; i<=n; i++){
//     factorial*=i;

// }
// console.log(factorial);

// let arr= [1,3,4,6,33,65,32,45,56,23,59,43];
// let min=arr[0];
// let max=  arr[0];
// for(let i=0; i<arr.length; i++){
//     if(arr[i]>max)
//         max= arr[i];
//     if(arr[i]<min)
//     min=arr[i] ;

// }
// console.log("max: "+max +"and min: "+min);

// code to remove all num from the array 

let arr=[1,2,3,4,5,6,2,3];
let num=2;
for(let i=0; i<arr.length; i++){
    if(arr[i]==num){
        arr.splice(i,1);
    }
}
console.log(arr);
