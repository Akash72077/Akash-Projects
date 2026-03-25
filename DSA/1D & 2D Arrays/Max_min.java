import java.util.*;
 class Max_min {
    public static void search(int matrix[][]){
        int min=matrix[0][0];
        int max=matrix[0][0];
        for(int i=0; i<matrix.length; i++){
            for(int j=0; j<matrix[0].length; j++)
            {
               if(matrix[i][j]>min){
                min=matrix[i][j];   
               }
              if(matrix[i][j]<max){
                max=matrix[i][j];       
               }
            }
        }
            System.out.println("The max and min elements in matrix are: "+max+","+min);
    }
    public static void main(String[] args) {
         Scanner sc=new Scanner(System.in);
         System.out.println("Enter the size of row: ");
        int n=sc.nextInt();
        System.out.println("Enter size of column: ");
        int m=sc.nextInt();
        int matrix[][]= new int [n][m];
        System.out.println("Enter the elements into matrix: ");
        for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
                matrix[i][j]=sc.nextInt();
            }
        }
        System.out.println("Enter the element to find: ");
        System.out.println("The elements in matrix are: ");
 for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
               System.out.print(matrix[i][j]+" ");
            }
            System.out.println();
        }
       search(matrix);  
        sc.close();
    }
}
