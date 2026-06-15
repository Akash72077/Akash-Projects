public class PivotIndex {
    static int findPivot(int arr[]){
        int rightSum=0;
        int leftSum=0;
        int n=arr.length;
        for(int var:arr){
            rightSum+=var;
        }
        for(int i=0; i<n; i++){
            int val=arr[i];
        rightSum-=val;
        if(leftSum==rightSum){
            return i;
        }
        leftSum+=val;
        }
        return -1;
    }
    public static void main(String[] args) {
        int arr[]= {1,7,3,6,5,6};
        System.out.println("Pivot Index is: "+findPivot(arr));
    }
}
