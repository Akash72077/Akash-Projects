public class FactorialExample {
    public static int fact(int n){
        if(n==1|| n==0){
            return 1;
        }
        return n*fact(n-1);
    }
    public static void main(String[] args) {
        int n=6;
        int m=4;
        int result1 =fact(n);
        int result2=fact(m);
        System.out.println("Factorial of "+n+ " is "+ result1);
        System.out.println("Factorial of "+m+ " is "+ result2);

    }
}
