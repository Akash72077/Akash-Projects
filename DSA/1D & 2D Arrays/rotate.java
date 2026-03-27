import java.util.*;
public class rotate {
     static void printArr(int arr[]){
        int n=arr.length;
        for(int i=0; i<n; i++){
        System.out.print(arr[i]+" ");
    }
    }

//    static void rotateExtraSpace(int arr[], int k){
//     // rotate an array using extra array
//     int n=arr.length;
//     int j=0;
//     int []ans=new int[n];
//     for(int i=n-k; i<n; i++){
//         ans[j++]=arr[i];
//     }
//     for(int i=0; i<n-k; i++){
//         ans[j++]=arr[i];
//     }
//     printArr(ans);
//    }
   static void swap(int arr[] ,int i,int j){
        int temp = arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
   }
   static void reverse(int arr[],int i,int j){    
    while (i<j) {
        swap(arr,i,j);
        i++;
        j--;
        
    }
   }
   static void rotateWithOutExtraSpace(int arr[] , int k){
        int n=arr.length;
    reverse(arr,0,n-1);
    reverse(arr, 0, k-1);
    reverse(arr, k, n-1);
    printArr(arr);    
   }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter size:");
        int n=sc.nextInt();
        int arr[]= new int[n];
        System.out.println("Enter "+n+" elements: ");
        for(int i=0;i<n; i++){
            arr[i]=sc.nextInt();
        }
        System.out.println("Enter no of rotations: ");
        int k=sc.nextInt();
         k=k%n;
        //rotateExtraSpace(arr,k);
        rotateWithOutExtraSpace(arr,k);
    sc.close();
    }
}
