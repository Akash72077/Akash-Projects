public class floydsdTriangle {
    public static void main(String[] args) {
        int value=1, n=5;
        for(int i=1; i<=n; i++){
            for(int j=1; j<=i; j++){
                System.out.print(value+" ");
                value++;
            }
            System.out.println();
        }
    }
}
