#include<stdio.h>
int main(){
    int n=5;
    int average;
    int arr[]={20,30,40,80,90};
    int sum=0;
    for(int i=0; i<n; i++){
        sum+=arr[i];
    }
    average=sum/n;
    printf("Average of array is: %d",average);
    return 0;
    
}