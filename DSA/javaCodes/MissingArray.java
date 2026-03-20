import java.util.*;
class MissingArray{
    public static void main(String[] args) {
        // int arr[]= {1,2,4,5};
        // int n= arr.length+1;
        // int sum= (n*(n+1))/2;
        // int arrSum=0;
        // for(int i=0; i<arr.length; i++){
        //     arrSum+=arr[i];
        // }
        // int MissNum= sum-arrSum; // take the size of n+1 and using sum of n numbers formula find the sum and take the array sum the differnece between arraySum and sum will be the missing number 
        // System.out.println("Missing number is: "+MissNum);
        // Arrays.sort(arr);
        // for(int i=0; i<arr.length-1; i++){// in this method we check sorted array with that element and index +1 element if not found it will be missing elememnt 
        //     if(arr[i]+1!= arr[i+1]){
        //         System.out.println("The missing element is "+ (arr[i]+1));
        //         return ;
        //     }
        // }
        // int arr[]= {-2, -1, 0 , 1, 3}; // in this approach we compare with the adjacent element of sorted array if the differnce is greater than 1 i+1 index element is the missing number
        // int size = arr.length;
        // for(int i=0; i<size-1; i++){
        //     if(((arr[i+1]-arr[i])>1)){
        //         System.out.println("The missing element is "+(arr[i]+1));
        //         return ;
        //     }
        // }
        int arr[]={1,2,3,4,5,8,7};
        int size=arr.length+1;// method 4 using bitwise XOR same element will cancel out reamining element will be the missing element 
        int XOR1=0;
        int XOR2=0;
        for(int i=1; i<size; i++ ){
            XOR1^=i;
        }
        for(int i=0; i<arr.length ; i++){
            XOR2^=arr[i];
        }

        int missing= XOR1^XOR2;
        System.out.println("The missing element in an array is: "+missing);

    }
}