#include<iostream>
using namespace std;
// two different ways to find the factorial of a number
int factoral(int n){
  if (n==0){
    return 1;
  }else{
return n*factoral(n-1);
  }
  
}
       //OR
int main(){
cout<<factoral(6);
return 0;
}
 int fact(int n){
  int fact=1;
  for(int i=1; i<=n; i++){
    fact*=i;
  }
  return fact;
}
