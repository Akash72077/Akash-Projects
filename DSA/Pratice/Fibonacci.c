#include<stdio.h>
int fibonacci(int n){

if(n==1){
    return 1;  // fibonacci using recusion
    
}
if(n==0){
    return 0;
}
return fibonacci(n-1)+fibonacci(n-2);

}
int main(){
int n; 
scanf("%d",&n);
int result=fibonacci(n);
printf("%d ",result);




    return 0;
}
#include <stdio.h>

int main() {
    int n, first = 0, second = 1, next;

    printf("Enter the number of terms: ");
    scanf("%d", &n);

    printf("Fibonacci Series: ");

    for (int i = 0; i < n; i++) {
        printf("%d ", first);
        next = first + second;
        first = second;
        second = next;
    }

    return 0;
}
