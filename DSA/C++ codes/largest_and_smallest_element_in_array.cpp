#include<iostream>
#include<limits.h>
using namespace std;
int main(){
    
    int size;

    cout<<"Enter the size of the array: "<<endl;
        cin>>size;
        int arr[size];
    cout<<"Enter the elements in array: "<<endl;
    for(int i=0; i<size; i++){
        cin>>arr[i];
    }
    int largest=INT_MIN;
    int smallest=INT_MAX;
    for(int i=0;i<size; i++){
        if(arr[i]>largest)
        largest=arr[i];
        if(arr[i]<smallest)
        smallest=arr[i];
    }
    cout<<"Largest element in the array is: "<<largest<<"\nSmallest element in the array is: "<<smallest; 

    return 0;

}