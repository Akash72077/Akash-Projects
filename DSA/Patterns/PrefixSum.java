import java.util.Scanner;
public class PrefixSum {
    static void checkSum(int arr[], int n){
// Check if we can partition the array into two subarrays with equal sum. More formally, check that the perifx sum of parts of the arrays is equal to the suffix sum of rest of the array.
        int prefix[]= new int[n];
        int suffix[]= new int[n];
        prefix[0]=arr[0];
        for(int i=1; i<n; i++){
               prefix[i]=arr[i]+prefix[i-1];
        }
        suffix[n-1]=arr[n-1];
        for(int i=n-2; i>0; i--){
               suffix[i]+=arr[i]+suffix[i+1];
        }
        printArr(arr, n);
        printArr(prefix, n);// code for prefix sum
        printArr(suffix, n);//code for suffix sum
    }
    // given an array of 'a', return the prefix sum/running sum in the same array
    static void printArr(int arr[], int n){
         for(int i=0; i<n; i++){
              System.out.print(arr[i]+" ");
        }
        System.out.println();
    }
    static void prefixSum(int arr[], int n){
        // For a given array of integers of size n, answer q queries to print the sum of values in a given range of indices from l to r
       for(int i=2; i<=n; i++){
               arr[i]=arr[i]+arr[i-1];
        }
        printArr(arr,n);//printing array
    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the size of an array: ");
        int n=sc.nextInt();
        int arr[]= new int[n];// for 0 based indexing
        //  int arr1[]= new int[n+1];// for 1 based indexing
        System.out.println("Enter "+n+" Elements: ");
        // for(int i=1; i<=n; i++){
        //     arr1[i]=sc.nextInt();    
        // }
        for(int i=0; i<n; i++){
            arr[i]=sc.nextInt();
        }
        // prefixSum(arr1,n);
        checkSum(arr, n);
        sc.close();
    }
}
