public class NToOne {

    static int print(int n){
        
        if(n==0){
            return 0;
        }else{
            System.out.print(n+" ");
        return print(n-1);
        }
    }
    public static void main(String[] args) {
        print(5);
    }
}
