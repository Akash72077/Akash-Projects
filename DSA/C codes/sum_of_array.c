#include<stdio.h>
int main(){
    int n=10;
    int avg;
    int arr[]={1,2,3,4,5,6,7,8,9,10};
    int sum=0;
    for(int i=0; i<n; i++){
        sum+=arr[i];
    }
    avg=sum/n;
    printf("The sum of the avg is %d", avg);
}