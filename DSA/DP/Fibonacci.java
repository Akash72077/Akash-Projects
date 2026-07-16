public class Fibonacci {

   static int fib(int n) {

       // here we used recursion but the disadvantage is the time complexity is 2^n because in recursion tree the new functions calls will happen for already calculated value

        if (n == 0 || n == 1)
            return n;
        else
            return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        System.out.println(fib(4));
    }
}
