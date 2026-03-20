public class characterPattern {
    public static void main(String[] args) {
        int n=4;
        char ch='A';
        for(int i=1; i<=n; i++){
            for(int j=1; j<=i; j++){
                 //char ch=(char)value;
                 System.out.print(ch);
               //value++;
               ch++;
            }
            System.out.println();
        }
    }
}
 