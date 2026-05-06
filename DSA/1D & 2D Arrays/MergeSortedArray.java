import java.util.Scanner;
public class MergeSortedArray {
    static void display(int nums1[], int nums2[]){
        int m=nums1.length;
        System.out.println("Elements in nums 1: ");
        for(int i=0; i<m; i++){
            System.out.print(nums1[i]+" ");
        }
        System.out.println();
        int n=nums2.length;
        System.out.println("Elements in nums 2: ");
        for(int i=0; i<n; i++){
            System.out.print(nums2[i]+" ");
        }
        System.out.println();
    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the size of array1: ");
        int m=sc.nextInt();
        System.out.println("Enter the size of array 2:");
        int n=sc.nextInt();
        int nums1[]= new int[m+n];
        int nums2[]=new int[n];
        System.out.println("Enter "+m+" Elements for array1: ");
        for(int i=0; i<m; i++){
            nums1[i]=sc.nextInt();
        }
        System.out.println("Enter "+n+" Elements for array2: ");
        for(int i=0; i<n; i++){
            nums2[i]=sc.nextInt();
        }
        display(nums1 , nums2);
        sc.close();
    }
}
