import java.util.*;;
public class sai {

    public static void main(String[] args) {
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter a number: ");
        int n=sc.nextInt();
        System.out.println(isPrime(n));
    }


    // amstrong number
    // the number of n digits so sum of indidual digit expont of n is equal original number like 1 5 3 = 1 cube + 5 cube + 3 cube is equal to 153 
    static boolean isAmstrong(int n){
        int rem, val=0;
        while (condition) {
            
        }
        while(n>0){

            rem=n%10;
            val
        }

    }
    // prime number
    static boolean isPrime(int n){
        for(int i=2; i<=Math.sqrt(n); i++){
            if(n%i==0){
                return false;
            }
            
        }
        return true;
    }
}
