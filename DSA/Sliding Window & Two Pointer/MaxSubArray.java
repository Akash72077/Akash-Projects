public class MaxSubArray {
    public static int MaxSubArrayBrute(int arr[], int k){

        // Brute Force apporach
        int max=Integer.MIN_VALUE;
        int n=arr.length;

        for(int i=0; i<n-k; i++){
            int CurSum=0;
            for(int j=i; j<k+i; j++){
                CurSum+=arr[j];
                    max=Math.max(max, CurSum);
            }
        }

        return max;
    }
    public static void main(String[] args) {
        int arr[]={1,4,2,10,23,3,1,0,20};
        int k=4;
        int result =MaxSubArrayBrute(arr, k);
        System.out.println(result);
    }
}
