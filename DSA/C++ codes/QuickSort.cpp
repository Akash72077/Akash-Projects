#include<iostream>
using namespace std;
void printArr(int arr[],int size){
    for(int i=0; i<size; i++){
        cout<<arr[i]<<" ";
    }

}
int partiton(int arr[],int si, int ei){
int i=si-1;
int pivot=arr[ei];
for(int j=si; j<ei; j++){
    if(arr[j]<=pivot){
        i++;
        swap(arr[i],arr[j]);
    }
}
i++;
swap(arr[i],arr[ei]);
return i;
}
void quickSort(int arr[], int si, int ei){
    if(si>=ei){
        return ;
    }
    int pivotIdx=partiton(arr,si,ei);
    quickSort(arr,si,pivotIdx-1);
    quickSort(arr,pivotIdx+1,ei);
}
int main(){
    int arr[]={4,3,6,8,7,9,10};
    int size=sizeof(arr)/sizeof(arr[0]);
    quickSort(arr,0,size-1);
  printArr(arr, size);

}