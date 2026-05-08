import java.util.Scanner;
public class Clear_ith_bit {
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter a number: ");
        int n=sc.nextInt();
        System.out.println("Enter i value (postion): ");
        int i=sc.nextInt();
        int bitmask=1<<i;
        int result=n&~bitmask;
        System.out.println(result);
    }
}
