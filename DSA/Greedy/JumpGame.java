public class JumpGame {
    public static void main(String[] args) {
        int arr[]= {1,1,2,5,2,1,0,0,1,3};
        int n=arr.length;
        int finalPosition=n-1;// the index which should be reached
        // starts from last to second element 
        //if we can able to reach 1(arr[8]) there is a chance to reach final if it has more or equal to one 
        for(int idx=n-2; idx>=0; idx--){
            if(arr[idx]+idx>=finalPosition){
                finalPosition=idx; 
            }
        }
        if(finalPosition==0){
            System.out.println(true);
        }else{
            System.out.println(false);
        }
    }
}
