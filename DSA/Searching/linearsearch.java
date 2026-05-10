import java.util.*;
public class linearsearch {
public static int linear(int array[],  int target){
    if(array.length==0){
        return-1;
    }
for(int i=0; i<array.length; i++){
    if(array[i]==target){
    return i;
    }
}
return -1;
}
    public static void main(String[] args) {
        Scanner  sc=new Scanner(System.in);
        System.out.println("Enter the no of elements in array: ");

        int size=sc.nextInt();

        int array[]=new int[size];
        System.out.println("Enter the "+ size+" Elements: ");
        for(int i=0; i<array.length; i++){
            array[i]=sc.nextInt();
        }
        System.out.println("Enter the element you want to find: ");
        int target=sc.nextInt();

        int position=linear(array,target);
        if(position!=-1){
            System.out.println("The element is found at index: "+position);

        }
        else{
            System.out.println("The element is not found in the array.");
        }
        sc.close();

        
    }
}
