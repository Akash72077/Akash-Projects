public class Factorial {
    public static int fact(int n){
        if(n==0||n==1){
        return 1;
        }


        return n*fact(n-1);
    }
    public static int loop(int n) {
        
        int result=1;
        for(int i=1; i<=n; i++){
            result=result*i;

        }
        return result;
    }
    public static void main(String[] args) {
        int n=5;
        int ans=fact(n);
        int result=loop(n);
        System.out.println(ans);
        System.out.println(result);
    }
    
}
