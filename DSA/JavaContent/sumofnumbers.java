
public class sumofnumbers{
    public static int SumofN(int n){
        if(n==0)
        return 0;
        int sum=n+SumofN(n-1);

        return sum;

    }
    public static void main(String[] args) {
        int n=5;
        System.out.println("The sum of the "+n+" number is :"+SumofN(n));
    }
}

