public class OrderAgnositcBinarySeach {

    public static void main(String[] args) {
    int[] arr= {987, 965, 943, 921, 899, 876, 854, 832, 810, 798,
 776, 754, 732, 710, 698, 676, 654, 632, 610, 598};
    
    int result=OrderAgnositcBS(arr, 610) ;
    System.out.println(result);
    }
    static int OrderAgnositcBS(int[] arr, int target){


        int start= 0;
        int end= arr.length-1;

        // boolean isAsc;// check is array is ascending or descending order
        // if(arr[start]<arr[end]){
        //     isAsc=true;
        // }else{
        //     isAsc=false;
        // } 
        // or we can write it as 
    boolean isAsc= arr[start]<arr[end];
            

        while (start<=end) {
            int mid= start+(end-start)/2;

            if(arr[mid]==target){
                return mid;
            }

            if (isAsc) {
                if(target<arr[mid]){
                end= mid-1;

            }else {
                start= mid+1;

            }
            }
            else{
                 if(target<arr[mid]){
                start= mid+1;

            }else{
                end= mid-1;

            }
            }

            
        }

        return -1;
    }
}