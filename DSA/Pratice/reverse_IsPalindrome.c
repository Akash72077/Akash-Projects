#include<stdio.h>
#include<string.h>
int main(){
    char num[20];
    printf("Enter a number");
    scanf("%s", num);
    int len=strlen(num);
    printf("The reversed number is: ");
    for(int i=len-1; i>=0; i--){
        printf("%c",num[i]);
    }
return 0;

}
// #include<stdio.h>
// int main(){
//     int number=141;
//     int original=number;
//     int reverse=0,digit;
//     while(number!=0){
//         digit=number%10;
//         reverse=reverse*10+digit;
//         number=number/10;
//     }
//     printf("%d\n",reverse);
//     if(reverse==original){
//         printf("It is a palindrome\n");
//     }else{
//         printf("It is not palindrome\n");
//     }
// }
//if input is like 4500 and 4399000 then 