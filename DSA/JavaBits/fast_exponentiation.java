import java.util.Scanner;
public class fast_exponentiation {
    public static int Fast_Expo(int a, int n){
        int ans=1;
        while(n>0){
            if((n&1)!=0){
                ans=ans*a;
            }
            a=a*a;
            n=n>>1;
        }
        return ans;
    }
    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter a number: ");
        int a=sc.nextInt();
        System.out.println("Enter its power: ");
        int n=sc.nextInt();
        System.out.println("Result: "+Fast_Expo(a, n));
        sc.close();
    }
}