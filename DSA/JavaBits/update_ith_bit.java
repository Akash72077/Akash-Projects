import java.util.Scanner;
public class update_ith_bit {
    static int set_ith_bit(int n, int i){
        int bitmask=1<<i;
        return bitmask | n;
    }
    static int Clear_ith_bit(int n, int i){
       int bitmask=1<<i;
        return ~bitmask & n;
    }
    static int Update_ith_bit(int n, int i, int newBit){// function to update ith bit 
        if(newBit==0){
            return Clear_ith_bit(n, i);
        }
        else{
            return set_ith_bit(n, i);
        }
    }
    public static void main(String[] args) {
          Scanner sc= new Scanner(System.in);
        System.out.println("Enter a number: ");
        int n=sc.nextInt();
        System.out.println("Enter postion : ");
        int i=sc.nextInt();
        System.out.println(Update_ith_bit(n, i, 0));//reset to 0 clear bit
        System.out.println(Update_ith_bit(n, i, 1));// set to 1 
        sc.close(); // scanner close       
    }
}
