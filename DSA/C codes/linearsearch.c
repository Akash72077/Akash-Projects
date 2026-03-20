#include<stdio.h>
int main(){
    int arr[]={1,2,3,4,5};
    int size=sizeof(arr)/sizeof(arr[0]);
    int target=3;
    for(int i=0; i<size; i++){
        if(arr[i]==target){
            printf("Element found at index: %d", i);
            return 0;
        }

    }
}