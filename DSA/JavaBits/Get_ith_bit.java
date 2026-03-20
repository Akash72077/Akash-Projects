import java.util.*;
public class Get_ith_bit {
    public static void main(String[] args) {
        // here bitmask is 1<<i
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter a number: ");
        int n=sc.nextInt();
        System.out.println("Enter the i value (Position): ");
        int i=sc.nextInt();
        
        int bitmask=1<<i;
        int result=n&bitmask;
        if(result!=0){
            System.out.println("The bit at "+i+" position is 1");
        }else{
            System.out.println("The bit at "+i+" position is 0");
        }
sc.close();
    }
}
