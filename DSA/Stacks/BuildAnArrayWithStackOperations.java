import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class BuildAnArrayWithStackOperations {

    public  static List<String> BuildArray(int[] target, int n){
        List<String> ans= new ArrayList<>();

    }

    public static void main(String[] args) {
            Scanner sc= new Scanner(System.in);
        System.out.println("Enter size of an array: ");
        int size=sc.nextInt();
        int[] arr= new int[size];
        System.out.println("Enter "+size+" elements to array: ");
        for (int i = 0; i < size; i++) {
            arr[i]=sc.nextInt();
        }
        System.out.println("Enter value of n: ");
        int n=sc.nextInt();

    }
}
