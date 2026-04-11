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
        int result[][]= new int[m][n];
        System.out.println("Enter the values for Matrix-1: ");
        for(int i=0; i<m;i++){
            for(int j=0; j<n; j++){
                mat1[i][j]=sc.nextInt();
            }
        }
        System.out.println("Enter the values for Matrix-2: ");
        for(int i=0; i<m;i++){
            for(int j=0; j<n; j++){
                mat2[i][j]=sc.nextInt();
            }
        }
        // code to calculate and store in result array
        for(int i=0; i<m;i++){
            for(int j=0; j<n; j++){
                result[i][j]=mat1[i][j]+mat2[i][j];
            }
        }
        //code to print the matrix 
        System.out.println("The addition matrix: ");
         for(int i=0; i<m;i++){
            for(int j=0; j<n; j++){
                System.out.print(result[i][j]+" ");
            }
            System.out.println();
        }
        sc.close();
    }
}
