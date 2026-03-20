#include<iostream>
using namespace std;
int main(){
    int a=10;
    int *ptr=&a;
    cout<<"Before increment "<<ptr<<endl;
    ptr++;
    cout<<"After incremenent "<<ptr<<endl;

    return 0;
}