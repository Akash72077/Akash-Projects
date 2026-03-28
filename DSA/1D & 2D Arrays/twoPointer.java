import java.util.Scanner;
public class twoPointer {
    // function to print an array
    static void printArr(int arr[]){
        int n=arr.length;
        for(int i=0; i<n; i++){
            System.out.print(arr[i]+" ");
        }
    }
    // inefficient appraoch
    static void sortArrayZerosOnes(int arr[]){
        int n=arr.length;
        int countZero=0;
        for(int i=0; i<n; i++){
            if(arr[i]==0){
                countZero++;
            }
        }
        for(int i=0; i<countZero; i++){
            arr[i]=0;
        }
        for(int i=countZero; i<n; i++){
            arr[i]=1;
        }
        printArr(arr);
    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the Size of an Array: ");
        int n=sc.nextInt();
        int arr[] = new int[n];
        System.out.println("Enter "+n+" Elements: ");
         for(int i=0; i<n; i++){
            arr[i]=sc.nextInt();
        }
        sortArrayZerosOnes(arr);
        sc.close();
    }
}
