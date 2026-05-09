import java.util.Scanner;
public class clear_last_ith_bits {
    static int clear_last_ith_bit(int n, int i){
        int bitmask=(-1)<<i;
        return bitmask&n;
    }
    public static void main(String[] args) {
        // to clear ith bits we have to make and & operation with bit mask
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter a number: ");
        int n=sc.nextInt();
        System.out.println("Enter number of last bits : ");
        int i=sc.nextInt();
        System.out.println("New output: "+clear_last_ith_bit(n, i));
        sc.close();
    }
}
