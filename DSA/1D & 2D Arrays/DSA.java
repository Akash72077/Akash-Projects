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
        static int unique(int arr[]){
            // unique element is finded using two loops to make this code efficent we have to use bitwise XOR
            int ans=-1;
            int n=arr.length;
            for(int i=0; i<n; i++){
                for(int j=i+1; j<n; j++){
                    if(arr[i]==arr[j]){
                        arr[i]=-1;
                        arr[j]=-1;

                    }
                }
            }
            for (int i = 0; i < arr.length; i++) {
                if(arr[i]>0){
                    ans=arr[i];
                }
            }
            return ans;
        }
        static int findMax(int arr[]){
             int n=arr.length;
            int ans=Integer.MIN_VALUE;
                for(int i=0; i<n; i++){
                if(arr[i]>ans){
                    ans=arr[i];
                }
            }
            return ans;
        }
        static int SecondLargest(int arr[]){
            int n=arr.length;
            int max=findMax(arr);// finds the maximum element from an array
             for(int i=0; i<n; i++){
                if(arr[i]==max){// then make as -infinity where we have found maximum number
                    arr[i]=Integer.MIN_VALUE;
                }
            }
             int sMax=findMax(arr);// now the maximum numbers will become -infinity now again find the max number it will be the second largest number
            return sMax;
        }
        static int firstRepeatingNumber(int arr[]){
            // Given an array consisting of integers. Return the first value that is repeating in this array. If no value is being repeated , return -1.
             int n=arr.length;
            for(int i=0; i<n; i++){
                for(int j=i+1; j<n; j++){
                    if(arr[i]==arr[j]){
                        return arr[i];
                    }
                }
            }
            return -1;         
        }
        static void swap(int a, int b){//program to swap the numbers
            System.out.println("Original values before swap: ");
            System.out.println("a: "+a);
            System.out.println("b: "+b);
            System.out.println("After swaping values: ");
            System.out.println("a: "+a);
            System.out.println("b: "+b);
        }    
        public static void main(String[] args) {
        Scanner sc= new Scanner(System.in); //scanner class
        System.out.println("Enter the size of arr: ");
        int n=sc.nextInt();//input
        int arr[]=new int[n]; //declaring array
        System.out.println("Enter "+n+" Elements: ");
        for(int i=0; i<n; i++){
           arr[i]=sc.nextInt();
        }
        //System.out.println("Enter target sum: ");
       // int target=sc.nextInt();
       // System.out.println("The no of Possible ways for pair sum is: "+pairSum(arr, target));
      //  System.out.println("The no of Possible ways for Triplet sum is: "+tripletSum(arr, target));
     // System.out.println(UniqueBitWise(arr));
    //System.out.println(unique(arr));
        // System.out.println(SecondLargest(arr));
        // System.out.println(findMax(arr));
        System.out.println("First Repeating Number: "+firstRepeatingNumber(arr));
        sc.close();// closed statement
    }
}
