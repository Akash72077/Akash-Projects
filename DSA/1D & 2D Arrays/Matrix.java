import java.util.Scanner;
public class Matrix {
    static void printArr(int arr[][]){
        for(int i = 0; i < arr.length; i++){
            for(int j = 0; j < arr[i].length; j++){
                System.out.print(arr[i][j] + " ");
            }
            System.out.println();
        }
    }
    // Matrix Multiplication
    static void multiplication(int mat1[][], int mat2[][], int m, int n, int p){
        int result[][] = new int[m][n];
        for(int i = 0; i < m; i++){
            for(int j = 0; j < n; j++){
                for(int k = 0; k < p; k++){
                    result[i][j] += mat1[i][k] * mat2[k][j];
                }
            }
        }
        System.out.println("Multiplication Matrix:");
        printArr(result);
    }
    // Matrix Addition
    static void addition(int mat1[][], int mat2[][], int m , int n){
        int result[][] = new int[m][n];
        for(int i = 0; i < m; i++){
            for(int j = 0; j < n; j++){
                result[i][j] = mat1[i][j] + mat2[i][j];
            }
        }
        System.out.println("Addition Matrix:");
        printArr(result);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter m (rows of mat1), p (cols of mat1 / rows of mat2), n (cols of mat2): ");
        int m = sc.nextInt();
        int p = sc.nextInt();
        int n = sc.nextInt();
        int mat1[][] = new int[m][p];
        int mat2[][] = new int[p][n];
        System.out.println("Enter values for Matrix-1:");
        for(int i = 0; i < m; i++){
            for(int j = 0; j < p; j++){
                mat1[i][j] = sc.nextInt();
            }
        }
        System.out.println("Enter values for Matrix-2:");
        for(int i = 0; i < p; i++){
            for(int j = 0; j < n; j++){
                mat2[i][j] = sc.nextInt();
            }
        }
        // Multiplication
        multiplication(mat1, mat2, m, n, p);
        // Addition (only possible if dimensions match)
        if(m == p && p == n){
            addition(mat1, mat2, m, n);
        } else {
            System.out.println("Addition not possible (dimensions must be same).");
        }
        sc.close();
    }
}