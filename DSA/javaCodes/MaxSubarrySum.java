//This is bruteforce method
import java.util.*;
public class MaxSubarrySum {
    public static void MaximumsubArray(int array[], int size){
        int currentSum=0;
        int maxSum=Integer.MIN_VALUE;
        for(int i=0; i<size; i++){
            for(int j=i; j<size; j++){
                currentSum=0;
                for(int k=i; k<=j; k++){
                    currentSum+=array[k];
                }
                if(currentSum>maxSum){
                    maxSum=currentSum;
                }           
            }         
        }
        System.out.println("Maximum sum of sub arrays are: "+maxSum);
    }
    public static void MinimumsubArray(int array[], int size){
        int currentSum=0;
        int minSum=Integer.MAX_VALUE;
        for(int i=0; i<size; i++){
            for(int j=i; j<size; j++){
                currentSum=0;
                for(int k=i; k<=j; k++){
                    currentSum+=array[k];
                }
                if(currentSum<minSum){
                    minSum=currentSum;
                }          
            }       
        }
        System.out.println("Minumum sum of sub arrays are: "+minSum);
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter size of an array: ");
    int size=sc.nextInt();
    int array[]=new int[size];
    System.out.println("Enter the elements in array: ");
    for(int i=0; i<size; i++){
        array[i]=sc.nextInt();
    }
   MaximumsubArray(array,size);
   MinimumsubArray(array, size);
   sc.close();
    }
}
