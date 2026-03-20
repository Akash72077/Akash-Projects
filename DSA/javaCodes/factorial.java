import java.util.*;


 class factorial {
    public static int fact(int n){
    if(n==0){
        return 1;
    }
    int fnm1=fact(n-1);
    int fn=n*fnm1;

   return  fn;
   
}

    // public static void PrintFactorial(int n){
    //     int factorial=1;
    //     for(int i=n; i>=1; i--){
    //         factorial=factorial*i;
    //     }
    //     System.out.println(factorial);
    //     return;
    // }



    public static void main(String[] args) {
    Scanner sc= new Scanner(System.in);
    int n=sc.nextInt();

   // PrintFactorial(n);
    sc.close();
    System.out.println(fact(n));

    }
}
