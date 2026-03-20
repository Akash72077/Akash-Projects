/******************************************************************************

Welcome to GDB Online.
GDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,
C#, OCaml, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.
Code, Compile, Run and Debug online from anywhere in world.

*******************************************************************************/
#include <iostream>
#include<vector>
using namespace std;

int main()
{
   int n=5;
   int arr[n]={1,2,3,4,5};
   for(int st=0; st<n; st++){
    for(int end=st; end<n; end++){
        for(int i=st; i<=end;i++){
            cout<<arr[i];
        }
        cout<<" ";
    }
    cout<<endl;
   }

    return 0;
}