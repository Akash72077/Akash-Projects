#include<bits/stdc++.h>
using namespace std;

void changeArr(int arr[], int size){
    for(int i=0; i<size; i++ ){
        arr[i]=2*arr[i];
    }
}


int main(){
    int arr[]={1,2,5,8,9};
    changeArr(arr,5);
    cout<<"In main function\n";
    cout<<"The elements are: ";
    for (int i = 0; i < 5; i++)
    {
        cout<<arr[i]<<" ";

    }
    cout<<endl;
    return 0;

}
