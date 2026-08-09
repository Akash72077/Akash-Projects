import java.util.Scanner;

public class RowWithSum {

    static void display(int []arr){
        for (int ints : arr) {
            System.out.print(ints+" ");
        }
    }

    static int[] maxRow(int [][]arr){
        int n=arr.length;
        if(n == 0){
            return new int[0];
        }
        int []ans = new int[n];

        for(int i=0; i<n; i++){
            int sum=0;
            for(int j=0; j<arr[i].length; j++){
                sum+=arr[i][j];
            }
            ans[i]=sum;
        }
        return ans;
    }


    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter no of rows & cols of matrix: ");
        int n=sc.nextInt();
        int m=sc.nextInt();
        int [][]arr= new int[n][m];
        System.out.println("Enter elements: ");
        for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
                arr[i][j]= sc.nextInt();
            }
        }
        int [] sol=maxRow(arr);
        display(sol);


    }
}
