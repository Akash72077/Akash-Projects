#include<stdio.h>
int main(){
    int n=5;
    for(int i=1; i<=n; i++){
        for(int gape=1; gape<=n-i; gape++){
            printf(" ");
        }
        for(int j=1; j<=i; j++){
            printf("%d ",j);
        }
        printf("\n");
    }
}