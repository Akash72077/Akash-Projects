import java.util.*;
 class Matrices {
    public static boolean search(int matrix[][],int key){
        for(int i=0; i<matrix.length; i++){
            for(int j=0; j<matrix[0].length; j++){
               if(matrix[i][j]==key){
                System.out.println("Element is found at ("+i+","+j+")");
                 return true;
               }
            }
        }
     return false;

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
        int key=sc.nextInt();
        System.out.println("The elements in matrix are: ");
 for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
               System.out.print(matrix[i][j]+" ");
            }
            System.out.println();
        }
        boolean result=search(matrix,key);
        if(result!=true){
            System.out.println("The element is not found");
        }
        sc.close();
    }
}
