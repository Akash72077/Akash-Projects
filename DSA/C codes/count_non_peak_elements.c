#include<stdio.h>
int main(){
    int arr[]={1,2,45,67,89,56,45,90,102};
    int n=sizeof(arr)/sizeof(arr[0]);
    int count=0;

    for(int i=1;i<n-1;i++){
        if(arr[i]>arr[i-1] && arr[i]>arr[i+1]){
            count++;
        }
    }
    int non_peak_elements=n-count;
    printf("The number of non peak elements in the array are: %d\n",non_peak_elements);
    return 0;
}
