public class BinaryToDecimal {
    public static void main(String[] args) {
        int Bi=101;
        int i=0;
        int sum=0;
        while (Bi>0){
            if( Bi%10==1){
        sum+=(int)Math.pow(2, i);
            }
            i++;
            Bi/=10;
        }
        System.out.println(sum);
    }
}
