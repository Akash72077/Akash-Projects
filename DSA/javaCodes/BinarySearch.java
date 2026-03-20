public class BinarySearch {
    public static void main(String[] args) {
        int arr[]={-10,-8,-5,-3,-2,0,2, 4, 6, 9, 11, 12, 14, 20, 36, 48};
        int pos= binary(arr, -5);
        System.out.println(pos);

    }
        
        // return -1 if does not found
   static int binary(int arr[], int target){

      
        int start= 0;
        int end = arr.length-1;
       
        while(start<=end){
            //find the middle elemenet 
      //int mid= (start+end)/2; // but this mya exceed the int range 
      // so use the formula int mid = start+ (end-start)/2;

      int mid = start+ (end-start)/2;
      if(target<arr[mid]){
        end= mid-1;
      }else if(target>arr[mid]){
        start=mid+1;

      }else{
        return mid;
      }
      
}



    return -1;
   } // if we dont know is the array is sorted in ascending order or descending order compare any two element if first element is greater than second element it is in descending order (or) if first element is less than secondary element it is in ascending order 
   /*but there is a problem in this method because if two number are equal then i will result wrong  so we using order Agnostic binary search method it is nothing but compare first and last element in an array if all elements are equal in array then only it will result wrong  */
}
