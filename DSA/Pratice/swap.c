#include<stdio.h>
int main(){
int a=10, b=20;
//with using temp
printf("The values of a and b before swap is:%d, %d\n ", a,b);
int temp=b;
b=a;
a=temp;
printf("The values of a and b after swap is:%d, %d \n", a,b);
//without using temp
int c=15,d=30;
 c=c+d;
 d=c-d;
 c=c-d;
 printf("The values of c and d are: %d %d\n",c,d);
 int p=45,q=55;
 printf("The values before swap are p=%d, q=%d\n", p, q);
 p=p^q;
 q=p^q;
 p=p^q;

 printf("The values after swap %d %d",p,q);




    return 0;
}