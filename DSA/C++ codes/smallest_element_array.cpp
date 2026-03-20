#include<bits/stdc++.h>
using namespace std;
int main(){
    int arr[5]={1,2,3,4,5};
    int n=sizeof(arr)/sizeof(arr[0]);
    int min=INT_MAX;
    
    
    for(int i=0; i<n; i++){
        if(arr[i]<min){
            min=arr[i];
        }
    }
    printf("The smallest element in the array is: %d", min);
    return 0;
}   