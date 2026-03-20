public class DecimalToBinary {
    public static int Binary(int n){
        int bin=0;
        int i=0;
        if(n>1){
            while(n>0){
                int rem= n%2;
                bin+=rem*(int)Math.pow(10,i);
                n=n/2;
                i++;
        }
        }
        return bin;       
    }
    public static void main(String[] args) {
        int n=7;
        System.out.println(Binary(n));   
            }
}
