#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
int main(){
    vector<int>arr={1,8,65,6,4,5,7};
    cout<<"Original array: "<<endl;
    for(int num: arr){
    cout<<num<<" ";
}
    cout<<endl;
    sort(arr.begin(),arr.end());
    cout<<"Sorted array: "<<endl;
    for(int num: arr){
        cout<<num<<" ";
    }
    cout<<endl;
return 0;
    
}