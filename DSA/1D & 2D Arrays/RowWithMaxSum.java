import java.util.Scanner;
public class RowWithMaxSum {
    static void display(int []arr){
        System.out.println("The maximum value: "+arr[1]+" in row "+arr[0]);
    }

    static int[] maxRow(int [][]arr){
        int n=arr.length;
        if(n == 0){
            return new int[0];
        }

        int max=0;
        int row=0;
        for(int i=0; i<n; i++){
            int sum=0;
            for(int j=0; j<arr[i].length; j++){
                sum+=arr[i][j];
            }
            if(sum>max){
                max=sum;
                row=i;
            }
        }
        return new int[]{row , max};
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
