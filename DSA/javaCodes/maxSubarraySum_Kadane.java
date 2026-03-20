import java.util.*;
public class maxSubarraySum_Kadane {
    public static void Kadane(int array[]){
        int currSum=0;
        int maxSum=Integer.MIN_VALUE;
        for(int i=0; i<array.length;i++){
            currSum+=array[i];

            if(maxSum<currSum){
        maxSum=currSum;          
        }
         if(currSum<0){
        currSum=0;
        }    
    }
    
        System.out.println("The max subarray sum is: "+maxSum);
    }
         public static void main(String[] args) {
      Scanner sc=new Scanner(System.in);
      System.out.println("Enter the size of array: ");  
      int size=sc.nextInt();
      int array[]=new int[size];
      System.out.println("Enter "+size+" elements to array: ");
      for(int i=0; i<size; i++){
        array[i]=sc.nextInt();
      }
      Kadane(array);
      sc.close();
    }


}
