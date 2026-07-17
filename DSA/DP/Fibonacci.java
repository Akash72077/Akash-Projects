import java.util.ArrayList;
import java.util.Collections;

public class Fibonacci {

   static int fib(int n) {

       // here we used recursion but the disadvantage is the time complexity is 2^n because in recursion tree the new functions calls will happen for already calculated value

        if (n == 0 || n == 1)
            return n;
        else
            return fib(n - 1) + fib(n - 2);
    }
    static int fibDp(int n, ArrayList<Integer> list){
        if (n <=1)
            return n;
        if(list.get(n)!=-1){
                return list.get(n);
        }
        int ans=(fibDp(n - 1,list) + fibDp(n - 2,list));
        list.set(n,ans);


        return ans;
    }
    static int FiboTab(int n){
        // this is also called as tabulation
        // here loops and storage is used
        // this is also called BottomDown approach
        // it involves 3 steps they are:
        // 1) define data structure and meaning ex: dp[i]=fib(i)
        // 2) initialize with the smallest ans.
        // 3) solve: small -> big
        int[] dp= new int[n+1];
        dp[0]=0;
        dp[1]=1;
        for (int i=2; i<=n; i++){
            dp[i]=dp[i-1]+dp[i-2];
        }

        return dp[n];
    }

    public static void main(String[] args) {
//        System.out.println(fib(100));
        int n=20;
        ArrayList<Integer> list = new ArrayList<>(Collections.nCopies(n+1,-1));
        list.set(0, 0);
        list.set(1, 1);
        System.out.println(fibDp(n, list));
        System.out.println(list);
        System.out.println("Fibonacci number of "+n+" is: "+FiboTab(n));


    }
}
