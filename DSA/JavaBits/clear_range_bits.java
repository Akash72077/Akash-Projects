import java.util.Scanner;

public class clear_range_bits {
    public static int clear_range_bit(int n, int i , int j){
        int a= ~0<<j+1;
        int b=(1<<i)-1;
        int bitmask=a|b;
        return n&bitmask;
    }
    public static void main(String[] args) {
         Scanner sc= new Scanner(System.in);
        System.out.println("Enter a number: ");
        int n=sc.nextInt();
        System.out.println("Enter range from and to: ");
        int i=sc.nextInt();
        int j=sc.nextInt();
        System.out.println("New output: "+clear_range_bit( n,  i,  j));
        sc.close();
    }
}
