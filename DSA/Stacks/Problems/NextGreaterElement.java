package Problems;

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
    public static  int[] nextGreaterElementLeetcode(int[] nums1, int[] nums2) {
        int n=nums1.length;
        int[] res= new int[n];

        return res;
    }
    public static void main(String[] args) {

        for (int i = 0; i < n; i++) {
            System.out.print(res[i]+" ");
        }
    }
}
