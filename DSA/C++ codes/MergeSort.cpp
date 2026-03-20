#include<iostream>
#include<vector>
using namespace std;
void merge(int arr[],int si,int mid,int ei){
    vector<int>temp;
    int i=si;
    int j=mid+1;
    while(i<=mid&&j<=ei){
        if(arr[i]<=arr[j]){
            temp.push_back(arr[i++]);
        }else{
            temp.push_back(arr[j++]);
        }
    }
while(i<=mid){
    temp.push_back(arr[i++]);
}
while(j<=ei){
    temp.push_back(arr[j++]);
}
// vector to original
for(int id=si, x=0; id<=ei; id++){
arr[id]=temp[x++];
}   
}
void mergesort(int arr[], int si, int ei){
    if(si>=ei){
        return ;
    }
   int mid=(si+ei)/2;
    mergesort(arr,si,mid);//left half array
    mergesort(arr,mid+1,ei);//right half array
merge(arr,si,mid,ei);  //conquer
}
void printarr(int arr[], int n){
    for(int i=0; i<n; i++){
        cout<<arr[i]<<" ";
    }
}
int main(){
    int arr[]={10,20,30,40,55,50,60};
    int size=sizeof(arr)/sizeof(arr[0]);
    mergesort(arr, 0, size-1);
    printarr(arr,size);
    return 0;

}