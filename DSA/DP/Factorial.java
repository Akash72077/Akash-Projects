import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class Factorial {


    static  int fact(int n ){

        if(n==0){
            return 1;
        }
        return n*fact(n-1);

    }

    static int Fact(int n, ArrayList<Integer> list){
// this code is implemented using Dp technique
        // this is memorization
        // here recursion is used and storage used to store function call values
        // this is also called as Topdown approach
        if(n==0){
            return 1;
        }

        if(list.get(n)!=-1){
            return list.get(n);
        }

        int ans= n*Fact(n-1, list);
        list.set(n, ans);
        return ans;

    }


    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the value of n: ");
        int n=sc.nextInt();
        if(n<0){
            System.out.println("Enter n value greater than 0 ");
            return;
        }
        ArrayList<Integer> lst= new ArrayList<>(Collections.nCopies(n+1, -1));
        lst.set(0,1);
        lst.set(1,1);
        int ans=Fact(n, lst);

        System.out.println("Factorial of "+n+" is: "+ans);




    }

}
