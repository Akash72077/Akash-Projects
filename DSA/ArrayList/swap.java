import java.util.ArrayList;
import java.util.Scanner;
public class swap {
public static void swapArr(ArrayList<Integer> list, int idx1, int idx2){
        int temp = list.get(idx2);
        list.set(idx2, list.get(idx1));
         list.set(idx1, temp);
    }

    public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
         ArrayList<Integer> list= new ArrayList<>();
     list.add(2);
     list.add(5);
     list.add(9);
     list.add(3);
     list.add(6);
     System.out.println("The Array list before swapping: "+list);
    
     System.out.println("Enter the index's to swap the numbers in array: ");
     int  idx1= sc.nextInt();
     int idx2= sc.nextInt();
    swapArr(list, idx1, idx2);

     System.out.println("The Array list after swapping: "+list);
     sc.close();
    }
}
