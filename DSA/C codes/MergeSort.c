#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int si, int mid, int ei) {
    int i = si;
    int j = mid + 1;
    int k = 0;
    int size = ei - si + 1;

    int* temp = (int*)malloc(size * sizeof(int));

    while (i <= mid && j <= ei) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }

    while (i <= mid) {
        temp[k++] = arr[i++];
    }

    while (j <= ei) {
        temp[k++] = arr[j++];
    }

    // Copy temp array back to original array
    for (i = 0; i < size; i++) {
        arr[si + i] = temp[i];
    }

    free(temp);
}

void mergesort(int arr[], int si, int ei) {
    if (si >= ei) {
        return;
    }

    int mid = (si + ei) / 2;
    mergesort(arr, si, mid);       // Left half
    mergesort(arr, mid + 1, ei);   // Right half
    merge(arr, si, mid, ei);       // Merge the two halves
}

void printarr(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
}

int main() {
    int arr[] = {10, 20, 30, 40, 55, 50, 60};
    int size = sizeof(arr) / sizeof(arr[0]);

    mergesort(arr, 0, size - 1);
    printarr(arr, size);

    return 0;
}
