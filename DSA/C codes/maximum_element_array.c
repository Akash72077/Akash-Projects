#include<stdio.h>
int main(){
    int arr[5] = {1, 13, 30, 9, 6};
int max=arr[0];
for(int i=0; i<5; i++){
    if(arr[i]>max){
        max=arr[i];
    }
    
}
printf("The maximum element in the array is %d", max);
return 0;


}