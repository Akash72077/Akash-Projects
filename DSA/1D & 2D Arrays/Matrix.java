import java.util.Scanner;
public class Matrix {
    static void printArr(int arr[][]){
        for(int i=0; i<arr.length;i++){
            for(int j=0; j<arr[i].length; j++){
                System.out.print(arr[i][j]+" ");
            }
            System.out.println();
        }
    }
    static void multiplication(int mat1[][], int mat2[][]){

    }
    static void addition(int mat1[][], int mat2[][], int m , int n){
        int result[][]= new int[m][n];
        for(int i=0; i<m;i++){
            for(int j=0; j<n; j++){
                result[i][j]=mat1[i][j]+mat2[i][j];
            }
        }
        System.out.println("The addition matrix: ");
        printArr(result);
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        //addition of matrix
        System.out.println("Enter the no of rows & colums of matrix: ");
        int m=sc.nextInt();
        int n=sc.nextInt();
        int mat1[][]= new int[m][n];
        int mat2[][]= new int[m][n];
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
        addition(mat1, mat2, m, n);
        sc.close();
    }
}
