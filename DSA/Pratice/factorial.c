#include<stdio.h>
int fact(int n){// factorial of the number using recursion
    if(n==0){
        return 1;
    }
   //  int fnm1=fact(n-1);
    int fn=n*fact(n-1);

   return  fn;
    
}
int main(){//factorial of the number using for loop 
    int n;
    scanf("%d",&n);
    // int fact=1;
    // for(int i=1; i<=n; i++ ){
    //     fact*=i;
    // }
    // printf("%d",fact);
    int value=fact(n);

    printf("Factorial of the %d is %d", n , value);

}