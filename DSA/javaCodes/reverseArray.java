//import java.util.*;
public class reverseArray {
public static void reverse(int arr[],int size){
    int start=0, last=arr.length-1;
     while(start<last){
           int temp=arr[last];
           arr[last]=arr[start];
           arr[start]=temp;
           start++;
           last--;
        }
}
    public static void main(String[] args) {
       // Scanner sc= new Scanner(System.in);
        int arr[]={1,2,3,4,5,6,7,8};
       reverse(arr, arr.length);
       for(int i=0; i<arr.length; i++){
        System.out.print(arr[i]+" ");
       }
       
    }
}
