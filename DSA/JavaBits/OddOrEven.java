import java.util.*;
public class OddOrEven {
    public static void main(String[] args) {
         Scanner sc= new Scanner(System.in);
         System.out.println("Enter a number to check: ");
         int n=sc.nextInt();
         int result=n&1;
         // here 1 is called as bitmask
         if(result==1){
            System.out.println("Given number is odd");
         }else{
            System.out.println("Given number is even");
         }
         sc.close();
    }
}
