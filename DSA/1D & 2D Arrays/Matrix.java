import java.util.Scanner;

public class Matrix {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        //addition of matrix
        System.out.println("Enter the no of rows & colums of matrix: ");
        int m=sc.nextInt();
        int n=sc.nextInt();
        int mat1[][]= new int[m][n];
        int mat2[][]= new int[m][n];
        for(int i=0; i<m;i++){
            for(int j=0; j<n; j++){
                mat1[i][j]=sc.nextInt();
            }
        }
        for(int i=0; i<m;i++){
            for(int j=0; j<n; j++){
                mat2[i][j]=sc.nextInt();
            }
        }
    }
}
