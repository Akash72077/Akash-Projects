public class pratice {
    public static void main(String[] args) {
        //What is the value of x^x for any value of x
        int x=10;
        System.out.println(x^x);
        // swap two numbersd without using any third varaible 
        // method-1: 
        int a=10;
        int b=20;
        a=a+b;
        b=a-b;
        a=a-b;
          System.out.println(a+" "+b);
        // method-2
        int c=12;
        int d=25;
        c=c^d;
        d=c^d;
        c=c^d;
        System.out.println(c+" "+d);
        //question 3
        // add 1 to an integer using bit manipulation 
        // Hint using bitwise not opeartor
        int p=10;
        int ans=~(~p)+1;
        System.out.println(ans);
    }
}
