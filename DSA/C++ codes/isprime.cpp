#include<iostream>
#include<cmath>
using namespace std;
// int main(){
//     int a;
//     cin>>a;
//     bool isprime=true;
//     for(int i=2; i<=a-1; i++){
//         if(a%i==0){
//             isprime=false;
//             break;
//         }
//     }
//     if(isprime)
//         cout<<"yes";
//     else
//         cout<<"No";
// }
int main(){
    int a;
    cin>>a;
    bool isprime=true;
    for(int i=2; i<=sqrt(a); i++){
        if(a%i==0){
            isprime=false;
            break;
        }
    }
    if(isprime)
        cout<<"yes";
    else
        cout<<"No";
}