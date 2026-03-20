import java.util.*;

public class largestNumber {
    public static int getLargest(int array[], int size){
        int largest=Integer.MIN_VALUE;// MIN_VALUE values is around -infinity
        int smallest=Integer.MAX_VALUE;
        for(int i=0; i<array.length; i++){
            if(array[i]>largest)
            largest=array[i];
            if (array[i]<smallest) {
                smallest=array[i];
            }
        }
      System.out.println("The smallest element in the array is: "+smallest);

        return largest;

    }
    public static void main(String[] args) {
        
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter the size of array: ");
        int size=sc.nextInt();
        int array []=new int[size];
        System.out.println("Enter the "+size+" elements: ");
        for(int i=0; i<array.length; i++){
            array[i]=sc.nextInt();
        }

        int largestNumber=getLargest(array, size);
        System.out.println("The largest element in the array is: "+largestNumber);

sc.close();
    }
    
}
