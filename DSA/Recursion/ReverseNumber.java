public class ReverseNumber {
    static int result=0;
    public static void rev(int n){
        
        if(n==0)
            return ;
        result=result*10+(n%10);
           rev(n/10);
    

    }
    public static void main(String[] args) {
int n=1234;
        
        rev(n);
        System.out.println((result==n));   // condition to check is number is palindrome or not 
    }
}
