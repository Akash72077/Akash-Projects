//import java.util.*;;
public class is_prime {
    public static void efficeint(int n){
        boolean result=true;
        for(int i=2; i<=Math.sqrt(n); i++){
            if(n%i==0){
                result=false;
            }
        }
        if(result==true){
        System.out.println("Prime number");
        }else{
            System.out.println("Not prime number");
        }
       
    }
    public static void normal(int n){
        boolean result= true;
        for(int i=2; i<n; i++){
            if(n%i==0){
                result=false;
            }

        }if(result==true){
        System.out.println("Prime number");
        }else{
            System.out.println("Not prime number");
        }
    }
    public static void main(String[] args) {
        int n=17;
        normal(n);
        efficeint(n);
        
    }
}
