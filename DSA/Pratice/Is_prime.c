#include<stdio.h>
#include<math.h>
#include<stdbool.h>
int main(){
int n;
scanf("%d",&n);// optimized version
bool result=true;
for(int i=2; i<=sqrt(n); i++){
if(n%i==0){
    result=false;
    
}
if(result!=false){
    printf("Given number is a prime number");
}else{
    printf("It is not prime number");
}
    return 0;
}
}
//normal version 
// int main(){
//     int n=5;
//     int result =1;
//     for(int i=2; i<n-1; i++){
//         if(n%i==0){
//             result=0;
//         }
//     }
//     if(result!=0){
//     printf("Given number is a prime number");
// }else{
//     printf("It is not prime number");
// }
// }