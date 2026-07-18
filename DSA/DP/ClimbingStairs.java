import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class ClimbingStairs {


        static int climbStairsTabulation(int n) {
            if(n==1 || n==2)
                return n;
            int[] dp = new int[n+1];
            dp[1]=1;
            dp[2]=2;
            for(int i=3; i<=n; i++){
                dp[i]=dp[i-1]+dp[i-2];
            }
            return dp[n];
        }
        static int climbStairsTabulationMemoryOptimized(int n){
            if(n==1 || n==2)
                return n;

            int prev2=1;
            int prev1=2;
            int result= prev1;
            for(int i=3; i<=n; i++){
               result=prev1+prev2;
               prev2=prev1;
               prev1=result;
            }
            return result;

        }

        static  int climbStairsMemorization(int n, ArrayList<Integer> list){
            if(n==1|| n==2){
                return n;
            }
            if(list.get(n)!=-1){
                return list.get(n);
            }
            int ans= climbStairsMemorization(n-1,list)+climbStairsMemorization(n-2,list);
            list.set(n,ans);
            return ans;

        }


    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter number of stairs: ");
        int n=sc.nextInt();
        System.out.println(climbStairsTabulation(n));
        ArrayList<Integer> list= new ArrayList<>(Collections.nCopies(n+1,-1));
        list.set(0, 0);
        list.set(1, 1);
        list.set(2, 2);

        System.out.println(climbStairsMemorization(n,list));
        System.out.println(list);
        System.out.println(climbStairsTabulationMemoryOptimized(n));


    }
}
