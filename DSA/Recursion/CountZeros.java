public class CountZeros {
static int count =0;
    public static void count(int n){
            if(n==0){
                return ;
            }else{
                if(n%10==0)
                count++;

                count(n/10);
            }
            
    }
    public static void main(String[] args) {
        count(1236600600);
        System.out.println(count);
    }
}
