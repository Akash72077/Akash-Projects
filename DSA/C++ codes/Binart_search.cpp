// #include<iostream>
// using namespace std;
// int main(){

// int arr[]={1,2,3,4,5};
// int key=4;
// int size=sizeof(arr)/sizeof(arr[0]);
// int postion=-1,start=0,end=size-1;
// while(start<=end){
//    int mid=(start+end)/2;
//  if(arr[mid]==key){
//  postion=mid;
//  break;
//  }
//  else if(key>arr[mid]){
//     start=mid+1;

//  }
//  else
//  end=mid-1;
// }
// cout<<postion;
//     return 0;
// }
#include<iostream>
using namespace std;
int BinarySearch(int *arr , int size, int key){
      int start=0,end=size-1;

   while(start<=end){
      int mid=(start+end)/2;
      if(key==arr[mid]){
         return mid;
      }
      else if(arr[mid<key]){
         start=mid+1;
      }
      else{
         end=mid-1;
      }
   }
   return -1;

}
int main(){
   int arr[]={10,20,30,40,50,60,70,90,80,100};
   int size=sizeof(arr)/sizeof(arr[0]);;
   cout<<BinarySearch(arr,size,50)<<endl;
   

}