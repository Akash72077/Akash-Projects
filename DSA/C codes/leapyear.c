#include <stdio.h>
int checkYear(int n) {
    if(n%4==0 && n%100!=0){
        return 1;
    }
    else if(n%400==0) {
        return 1;
    }
    else{
        return 0;
    }
}



int main() {
    int t;
    scanf("%d", &t);
    while (t--) {
        int N;
        scanf("%d", &N);
        if (checkYear(N))
            printf("%s\n", "true");
        else
            printf("%s\n", "false");

    }
    return 0;
}