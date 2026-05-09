import java.util.Scanner;
public class clear_last_ith_bits {
    public static void main(String[] args) {
        // to clear ith bits we have to make and & operation with bit mask
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter a number: ");
        int n=sc.nextInt();
        System.out.println("Enter postion : ");
        int i=sc.nextInt();
        sc.close();
    }
}
