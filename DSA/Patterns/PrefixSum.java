import java.util.Scanner;

public class PrefixSum {
    static void printArr(int arr[], int n){
        
         for(int i=1; i<=n; i++){
              System.out.print(arr[i]+" ");
        }
    }
    static void prefixSum(int arr[], int n){
        
       for(int i=2; i<=n; i++){
               arr[i]=arr[i]+arr[i-1];
        }
        printArr(arr,n);
    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the size of an array: ");
        int n=sc.nextInt();
        int arr[]= new int[n+1];
        System.out.println("Enter "+n+" Elements: ");
        for(int i=1; i<=n; i++){
            arr[i]=sc.nextInt();    
        }
        prefixSum(arr,n);
        sc.close();
    }
}
