import java.util.Scanner;
public class clear_last_ith_bits {
    static int clear_last_ith_bit(int n, int i){
        int bitmask=(-1)<<i; // wq can use -1 or ~0 to get all 1's in binary from
        // 1's is left shifted then 0's added right side 
        // example 1111 is << 2 it becomes 1100 
        return bitmask&n; // when 1100 did  & operation then that last two digits become 0 
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
