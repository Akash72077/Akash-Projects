#include<iostream>
using namespace std;
int main(){
    int arr[]={1,2,3,4,5,6,7,8,9,10};
    int size=10;
    int target=8;
    for (int  i = 0; i < size; i++)
    {
        if (arr[i]==target)
        {
            cout<<"Element found at index: "<<i<<endl;
            break;
        }
       
        
    }
    return 0;
}