#include<stdio.h>
int main(){
    
int a=10, b=20, c=30;
(a>b&&b>c)?printf("a is greater"):(b>c&&b>a)?printf("b is greater "):printf("C is greater");

    return 0;
}