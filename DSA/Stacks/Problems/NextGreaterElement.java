package Problems;

import java.util.Scanner;// importing Scanner class

public class NextGreaterElement {
    public static  int[] nextGreaterElement(int[] arr){
        int n= arr.length;
        int[] res= new int[n];
        for(int i=0; i<n; i++){
            res[i]=-1;
            for(int j=i+1; j<n; j++ ){
                if(arr[i]<arr[j]){
                    res[i]=arr[j];
                    break;
                }
            }
        }
        return res;
    }
    public static int[] nextGreaterElementLeetcode(int[] nums1, int[] nums2) {
//brute force
        int[] res = new int[nums1.length];

        for (int i = 0; i < nums1.length; i++) {

            res[i] = -1;

            // Find the position of nums1[i] in nums2
            int index = -1;

            for (int j = 0; j < nums2.length; j++) {
                if (nums2[j] == nums1[i]) {
                    index = j;
                    break;
                }
            }
            // Search for the next greater element
            for (int j = index + 1; j < nums2.length; j++) {
                if (nums2[j] > nums1[i]) {
                    res[i] = nums2[j];
                    break;
                }
            }
        }
        return res;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
//    int[] arr={1,3,2,1,8,6,3,4};
//    int n= arr.length;
//   int[] res= nextGreaterElement(arr);
//        for (int i = 0; i < n; i++) {
//            System.out.print(res[i]+" ");
//        }
        System.out.println("Enter size of nums1: ");
        int m= sc.nextInt();
        int[] nums1= new int[m];
        System.out.println("Enter size of nums2: ");
        int n= sc.nextInt();
        int[] nums2= new int[n];
        System.out.println("Enter elements into nums1: ");
        for (int i = 0; i < m; i++) {
            nums1[i]= sc.nextInt();
        }
        System.out.println("Enter elements into nums2: ");
        for (int i = 0; i < n; i++) {
            nums2[i]= sc.nextInt();
        }
        int[] ans=nextGreaterElementLeetcode(nums1, nums2);
                for (int i = 0; i < m; i++) {
            System.out.print(ans[i]+" ");
        }


    }
}
