//with extra space
#include<iostream>
using namespace std;
// void printArr(int *arr, int size){
//     for(int i=0; i<size; i++){
//         cout<<arr[i]<<",";
        
//     }
//     cout<<endl;
// }
// int main(){
//     int arr[]={1,2,4,5,8,6};
//     int size=sizeof(arr)/sizeof(arr[0]);
//     int copyArr[size];
//     for(int i=0; i<size; i++){
//         int j=size-i-1;
//         copyArr[i]=arr[j];
//     }
//     for (int  i = 0; i < size; i++)
//     {
//         arr[i]=copyArr[i];
//     }
//     printArr(arr,size);
     
// }
//without extra space (2 pointer approch)
#include<iostream>
using namespace std;
void printArr(int *arr, int size){
    for(int i=0; i<size; i++){
        cout<<arr[i]<<",";
        
    }
    cout<<endl;
}
int main(){
    int arr[]={1,2,4,5,8,6};
    int size=sizeof(arr)/sizeof(arr[0]);
    int start=0, end=size-1;
    while(start<=end){
        //swap
        int temp=arr[start];
        arr[start]=arr[end];
        arr[end]=temp;
        start++;
        end--;
    }
    printArr(arr,size);
     
}

