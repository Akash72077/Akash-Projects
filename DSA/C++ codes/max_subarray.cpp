#include<iostream>
#include<climits>
using namespace std;
void maxSubarray(int *arr,int size){
    int maxSum=INT_MIN;
    for(int start=0; start<size; start++){
        for(int end=start; end<size; end++){
            int currSum=0;
            for(int i=start; i<=end; i++){
                currSum+=arr[i];
            }
            cout<<currSum<<",";  
            maxSum=max(maxSum, currSum);
        }
        cout<<endl;
    }
    cout<<"Maximum Sum is: "<<maxSum<<endl;

}
int main(){
    int arr[]={5,6,-6,4,-3};
    int size=sizeof(arr)/sizeof(arr[0]);
    maxSubarray(arr,size);
}