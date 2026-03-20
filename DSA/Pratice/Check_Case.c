#include<stdio.h>
int main(){
    char ch;
    scanf("%c",&ch);
    int value=ch;
    if(ch>=65&&ch<=91){
printf("The character is in upper case");
    }else if (ch>=97&&ch<=122){
        printf("The character is in lower case ");

    }
    else{
        printf("Invalid input");
    }
    
    return 0;
}