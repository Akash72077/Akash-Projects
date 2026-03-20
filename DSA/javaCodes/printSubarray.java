import java.util.*;
public class printSubarray {
    public static void SubArry(int array[],int size){
        int ts=0;// total sub arrays
        for(int i=0; i<size; i++){
            for(int j=i; j<size; j++){
                for(int k=i; k<=j; k++){
System.out.print(array[k]+" ");
                }ts++;
               

                System.out.println();
            }
            System.out.println();
        }
                    System.out.println("Total Sub arrays is: "+ts);

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
      SubArry(array,size);
      sc.close();
    }
}
