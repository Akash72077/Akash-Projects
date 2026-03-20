import java.util.*;
public class repeatedElements {
    public static void Count(int arr[]){
        int count=0;
        int min=0;
        for(int i=0; i<arr.length; i++){
            count=0;

            for(int j=i+1; j<arr.length; j++){
                if(arr[i]==arr[j])
                count++;
                if(count>min){
                    min=count;
                }

            }
        }
        System.out.println("The number of occurances: "+ min);

        
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the size of an array: ");
        int size=sc.nextInt();
        
        int arr[]=new int[size];
        System.out.println("Enter the elements into array: ");
        for(int i=0; i<size; i++){
            arr[i]=sc.nextInt();
        }
        Count(arr);
        

sc.close();
    }
}
