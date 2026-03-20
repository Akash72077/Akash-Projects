#include <stdio.h>

void printArr(int arr[], int size) {
    for(int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int partition(int arr[], int si, int ei) {
    int pivot = arr[ei];
    int i = si - 1;

    for(int j = si; j < ei; j++) {  // Note: You had "i < ei" in C++, which is wrong
        if(arr[j] <= pivot) {
            i++;
            // Swap arr[i] and arr[j]
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    // Swap arr[i+1] and arr[ei]
    int temp = arr[i+1];
    arr[i+1] = arr[ei];
    arr[ei] = temp;

    return i+1;
}

void quickSort(int arr[], int si, int ei) {
    if(si >= ei) return;

    int pivotIdx = partition(arr, si, ei);
    quickSort(arr, si, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, ei);
}

int main() {
    int arr[] = {4, 3, 6, 8, 7, 9, 10};
    int size = sizeof(arr) / sizeof(arr[0]);

    quickSort(arr, 0, size - 1);
    printArr(arr, size);

    return 0;
}
