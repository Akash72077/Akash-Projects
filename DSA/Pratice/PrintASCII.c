#include<stdio.h>
int main(){
    int a=10,b=15;
    // implicit type conversion
char ch='A';
int value=ch;
//explicit type conversion
int s=(int)ch;
printf("%d",s);


printf("The ASCII value of A is %d",value);
return 0;

}