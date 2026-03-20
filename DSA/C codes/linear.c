#include<stdio.h>
int main(){
    int arr[]={4,5,7,8,0,11,5,6,16};
    int n=sizeof(arr)/sizeof(arr[0]);
    int target,pos;
    printf("Enter target element: ");
    scanf("%d", &target);
    for(int i=0; i<=n-1; i++){
        if(arr[i]==target){
            pos=i;
        break;
        }
        pos=-1;
    }
    if(pos==-1){
        printf("The element is not found");
    }else{
    printf("The element is found at index %d", pos);
    }
    return 0;
}