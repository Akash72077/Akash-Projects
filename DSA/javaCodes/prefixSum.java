import java.util.Scanner;

public class prefixSum {
     public static void prefix(int array[], int size){
        
        for(int i=0; i<size; i++){
            for(int j=i; j<i; j++){
                
            }
            
        }
        
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
  prefix(array, size);
   sc.close();
    }
}
