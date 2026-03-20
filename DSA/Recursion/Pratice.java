public class Pratice {

    static int count =0; 
    static int countZero=0;
    static int fact=1;
    static int rev=0;
    static int sum=0;
    public static void CountDigits(int n){
        if(n==0){
            return;
        }else{
            count++;
            n=n/10;
            CountDigits(n);
        }
    }
    public static void countZero(int n){

        if(n==0){
            return ;
        }else{
            if(n%10==0)
                countZero++;
                countZero(n/10);
            
        }
    }
    public static int fact(int n){
        if(n==0||n==1){
            return 1;
        }else{
            return n * fact(n-1);
        }
    }
    public static int fibonacci(int n){
        if(n==0)
            return 0;
        if(n==1)
            return 1;
        else{
            return fibonacci(n-1)+fibonacci(n-2);
        }

    }
    public static void onetoN(int n){
        if (n==0) {
            return ;
        }else{
             onetoN(n-1);
            System.out.print(n+" ");
        }
    }
     public static void NtoOne(int n){
        if (n==0) {
            return  ;
        }else{
           
            System.out.print(n+" ");
            NtoOne(n-1);
        }
    }
    public static void rev(int n){
        if(n==0)
            return ;
            rev=rev*10+(n%10);
             rev(n/10);
    }
     public static void SumOfDigits(int n){
        if(n==0)
            return ;
        sum+=n%10;
        SumOfDigits(n/10);
           }

            public static int SumOfNNumbers(int n){

        if(n==0){
            return 0;
        }else{
             int sum=n+SumOfNNumbers(n-1);
             return sum;

        }

    }

    public static void main(String[] args) {
        CountDigits(13456);
        System.out.println("Number of digits: " +count);
        countZero(1050680);
        System.out.println("No of Zeros: "+countZero);
        System.out.println("Factorial is: "+fact(5));
        System.out.println("Fibonaaci series is :" );

        for(int i=0; i<8; i++){
            System.out.print(fibonacci(i)+" ");
        }
        System.out.println();
        onetoN(5);
        System.out.println();
        NtoOne(5);
        System.out.println();
        rev(12345);
        System.out.println(rev);
        SumOfDigits(123456);
        System.out.println(sum);
        System.out.println(SumOfNNumbers(5));



    }
}
