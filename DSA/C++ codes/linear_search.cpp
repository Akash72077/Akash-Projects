#include<bits/stdc++.h>
using namespace std;

int main(){
    int n;
    cout<<"Enter the number of elements in array: ";
    cin>>n;
    int arr[n];
    cout<<"Enter "<< n <<" elements: ";
    for(int i=0; i<n; i++){
        cin>>arr[i];
    }
    int target;
    int found=0;
    cout<<"Enter target element: "<< endl;
    cin>>target;
    for(int i=0; i<n; i++){
        if(arr[i]==target){
             found=1;
            cout<<"The element is found at: "<<i<<endl;
        }
        
    }if(found==0){
        cout<<"The element is not found."<<endl;
    }
    return 0;
    
}
