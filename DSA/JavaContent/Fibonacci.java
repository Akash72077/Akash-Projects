public class Fibonacci {
  public static int printFib(int n){
        if(n==1|| n==0){//base condition
            return 1;

        }
        int fbn=printFib(n-1)+printFib(n-2); // recursion 
        return fbn;// returns fib number
    }
    public static void main(String[] args) {
        int n=10;
        printFib(n);

    }
}
