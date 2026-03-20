#include<stdio.h>   
#include<stdlib.h>
int main()
{
    int n;
    int arr[] = {1, 2, 0, 3, 4, 5};
    int low = 0, high = n - 1;
    while(low <= high)
    {
        int mid = low + (high - low) / 2;
        if((mid == 0 || arr[mid] >= arr[mid - 1]) && (mid == n - 1 || arr[mid] >= arr[mid + 1]))
        {
            printf("Peak element is %d\n", arr[mid]);
            break;
        }
        if(mid > 0 && arr[mid - 1] > arr[mid])
        {
            high = mid - 1;
        }
        else
        {
            low = mid + 1;
        }
        printf("Peak element is %d\n", arr[mid]);
    }
    return 0;
}