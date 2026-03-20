public class CountDigits {
static int count =0;
    public static void count(int n){
            if(n==0){
                return ;
            }else{
                count++;
                count(n/10);
            }
            
    }
    public static void main(String[] args) {
        count(123666);
        System.out.println(count);
    }
}
