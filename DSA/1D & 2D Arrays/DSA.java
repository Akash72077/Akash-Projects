import java.util.Scanner;
public class DSA {
    static int tripletSum(int arr[], int target){
        //program to count the total number of triplets whouse sum is equal to the given value of X
        int ans=0;
        int n=arr.length;
        //time complexity O(n^3)
         for(int i=0; i<n; i++){
            for(int j=i+1; j<n; j++){
                for(int k=j+1; k<n; k++){
                    if(arr[i]+arr[j]+arr[k]==target){
                    ans++;
                }
                }
            }
        }
        return ans;
    }
    static int pairSum(int arr[], int target){
        //program to find the total number of pairs in the arrays whose sum is equal to given target
        int n=arr.length;
        int ans=0;
        //time complexity O(n^2)
        for(int i=0; i<n; i++){
            for(int j=i+1; j<n; j++){
                if(arr[i]+arr[j]==target){
                    ans++;
                }
            }
        }
        return ans;
    }
    static int UniqueBitWise(int arr[]){
            // Find the unique nimber in a given arrat where all elements are being repeated twice with one value being unique
            // the elements are postive
            int n=arr.length;
            int ans=0;
            for(int i=0; i<n; i++){
                ans^=arr[i];
            }

            return ans;

        }

        public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the size of arr: ");
        int n=sc.nextInt();
        int arr[]=new int[n];
        System.out.println("Enter "+n+" Elements: ");
        for(int i=0; i<n; i++){
           arr[i]=sc.nextInt();
        }
        //System.out.println("Enter target sum: ");
       // int target=sc.nextInt();
       // System.out.println("The no of Possible ways for pair sum is: "+pairSum(arr, target));
      //  System.out.println("The no of Possible ways for Triplet sum is: "+tripletSum(arr, target));
      System.out.println(UniqueBitWise(arr));
        sc.close();
    }
}
