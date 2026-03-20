public class sumofnumbers {
    public static int num(int n){

        if(n==0){
            return 0;
        }else{
             int sum=n+num(n-1);
             return sum;

        }

    }
    public static void main(String[] args) {
      int n=5;
        int sum=num(n);
        System.out.println(sum);
    }
}
