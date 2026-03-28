import java.util.Scanner;
public class twoPointer {
    // function to swap elements in an array
    static void swap(int arr[], int i, int j){
        int temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
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
    // efficient approch completes sort in one iteration
    static void sortArrayZerosOnesEfficient(int arr[]){
         int n=arr.length;
         int i=0;
         int j=n-1;
         while(i<j){
            if(arr[i]==1&&arr[j]==0){
                swap(arr, i, j);
                i++;
                j--;
            }
            if(arr[i]==0){
                i++;
            }
            if(arr[j]==1){
                j--;
            }
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
        // sortArrayZerosOnes(arr);
        sortArrayZerosOnesEfficient(arr);
        sc.close();
    }
}
