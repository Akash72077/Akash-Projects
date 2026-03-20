#include<stdio.h>
int main(){
    int n;
    printf("Enter the size of array: ");
    scanf("%d",&n);
        int arr[n];

    printf("Enter the elements in array: ");
    for(int i=0; i<n; i++){
        scanf("%d",&arr[i]);
    }
    int target;
    
    int min=0;
    int max=n-1;
    int found=0;
    printf("Enter the target element: ");
    scanf("%d",&target);
    while(min<=max){
        int mid=(min+max)/2;
        if(arr[mid]==target){
            printf("The element is found at index %d", mid);
            found=1;
            break;
            
        }
        if(arr[mid]<target){
        min=mid+1;
        }
        else{
            max=mid-1;
            
        }
    }
    if (!found) {
        printf("Element not found in the array.\n");
    }

    return 0;
    
}