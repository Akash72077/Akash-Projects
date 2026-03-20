// the program to check the array is sorted or not
#include<stdio.h>
int main(){
    int arr[5]={1,2,3,4,5};
    for(int i=1; i<=5; i++){
    if(arr[i-1]<arr[i]){
        printf("Array is sorted\n");

        break;
    }
    else{
        printf("Array is not sorted\n");

        break;
        
    }
}
}