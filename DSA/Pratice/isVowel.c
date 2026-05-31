#include<stdio.h>
int main(){
    char ch;
    scanf("%c",&ch);
    switch (ch)
    {
    case 'a':
    case 'e':
    case 'i':
    case 'o':
    case 'u':
    case 'A':
    case 'E':
    case 'I':
    case 'O':
    case 'U':
//ch3cks conditon if found it will return ouput  
   printf("The input is vowel");
   break;
   default: // else peint deafult statement 
    printf("Character");
    break;
    }
}
