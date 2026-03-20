#include <stdio.h>

int countDistinct(int arr[], int n) {
    int res = 1;
    for (int i = 1; i < n; i++) {
        int j;
        for (j = 0; j < i; j++) {
            if (arr[i] == arr[j]) {
                break;
            }
        }
        if (i == j) {
            res++;
        }
    }
    return res;
}

int main() {
    int arr[] = { 12, 10, 9, 45, 2, 10, 10, 45 };
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("%d\n", countDistinct(arr, n));
    return 0;
}