public class oddOrEven {
    public static void byBits(int a){
        int result=a&1;
        if(result==1){
            System.out.println("odd");
        }else{
            System.out.println("Even");
        }
    }
    public static void byModulo(int a){
        if(a%2==0){
            System.out.println("Even");
        }else{
            System.out.println("Odd");
        }
    }
    public static void main(String[] args) {
        int a=10;
        byModulo(a);
        byBits(a);
    }
}
