import java.util.*;
public class PrimeNumbers{
    //prime numbers in range 
    public static boolean isPrime(int n){
        if(n<=1){
            return false;
        }
        boolean isPrime=true;
        for(int i=2; i<=(int)Math.sqrt(n); i++){
            if(n%i==0){
                return false;
            }
        }
        return isPrime;
    }
	public static void main(String[] args) {
		Scanner sc =new Scanner(System.in);

		// System.out.println(isPrime(6));
        int n=100;
        for(int i=2; i<=n; i++){
            if(isPrime(i)){
                System.out.print(i+" ");
            }
        }

        sc.close();
	}

}


