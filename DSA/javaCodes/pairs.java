import java.util.*;
public class pairs {
    public static void printPairs(int array [], int size){
        int tp=0;
for(int i=0; i<size; i++){
    for(int j=i+1;j<size;j++){
        System.out.print("("+array[i]+","+array[j]+ ")");
        tp++;
    }System.out.println();
    
}    System.out.println("Total pairs are: "+tp);

    } 
    public static void main(String[] args) {
    
    Scanner sc=new Scanner(System.in);
    System.out.println("Enter the size of an array: ");
    int size=sc.nextInt();
    int array[]= new int[size];
    System.out.println("Enter the elements " +size+ " into array: ");
    for(int i=0; i<size; i++){
    array[i]=sc.nextInt();
       
 }printPairs(array, size);
sc.close();

    }
}
