public class Fibonacci {
  public static int printFib(int n){
        if(n==1|| n==0){
            return 1;

        }
        int fbn=printFib(n-1)+printFib(n-2);
        return fbn;
    }
    public static void main(String[] args) {
        int n=10;
        printFib(n);

    }
}
