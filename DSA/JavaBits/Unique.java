/*
problem statement : In an given array elements will repat twice and 
one element does is unique find the element 
arr is [2, 3, 4, 1, 2,1,3, 6, 4]

 */



import java.util.Arrays;

public class Unique {
    public static void main(String[] args) {
       // int arr[]= {2, 3, 4, 1, 2,1,3, 6, 4};
         int arr[]= {-2, 3, 2, 4, -5,5, 4};
       int n=arr.length;

        
        //Arrays.sort(arr);
int res=0;
       for(int i=0; i<n; i++){
       res^=arr[i];

       }
       System.out.println(res);
    }
}

/* problem statement:
An array contains a digits of both postive and negative numbers of it 
but a unique element will exist find the element 
*/
