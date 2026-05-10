import java.util.*;
public class power_of_two {
    public static boolean power_of_two(int n){
        return (n&(n-1))==0;
    }
public static void main(String[] args) {
    Scanner sc= new Scanner(System.in);
    System.out.println("Enter a number to check is it power of two: ");
    int n=sc.nextInt();
    System.out.println(power_of_two(n));
    sc.close();
}
}