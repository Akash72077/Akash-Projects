public class toh {

    public static void toh(int n, char source, char aux, char dest) {

        if (n == 0) {
            return;
        }
        if (n == 1) {
            System.out.println("Move disk 1 from " + source + " to " + dest);
            return;
        }
        toh(n - 1, source, dest, aux);
        System.out.println("Move disk " + n + " from " + source + " to " + dest);
        toh(n - 1, aux, source, dest);
    }

    public static void main(String[] args) {
        toh(3, 'A', 'B', 'C');
    }
}