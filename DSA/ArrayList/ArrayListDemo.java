import java.util.ArrayList;
import java.util.Scanner;
 class ArrayListDemo {
    public static void swap(ArrayList<Integer> list2, int idx1, int idx2){
        int temp = list2.get(idx2);
        list2.set(idx2, list2.get(idx1));
         list2.set(idx1, temp);
    }
    public static void main(String[] args) {
        ArrayList<Integer> list= new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        
        list.add(1);  // time complexity is O(1)
        list.add(2);// adds the element 
        list.add(3);
        list.add(4);
        list.add(5);
      //  get operations time complexity is O(1)
    //    int element = list.get(2);
    //    System.out.println(element);

    // //    remove element 
    //    list.remove(2); // time complexity is O(n)
    //    System.out.println(list);
    //    list.add(2, 10);
    //    System.out.println(list);
    //    // set element at index
    //    list.set(0, 3); // time complexity is O(n)
    //     System.out.println(list);
    //     // contains function is used to check the element is exist on array list or not 
    //     // time complexity is O(n)
    //     System.out.println(list.contains(2));
    //     System.out.println(list.contains(11));
    // System.out.println(list.size());
    // System.out.println("The elements of an array is: ");
    // for(int i=0 ; i<list.size(); i++){
    //     System.out.print(list.get(i)+" ");
    // }
    // System.out.println("The reverse elements of an array: ");
    // for(int i=list.size()-1; i>=0; i--){
    //     System.out.print(list.get(i)+" ");
    // }
    // int max= Integer.MIN_VALUE;
    // for(int i=0 ; i<list.size(); i++){
    //     // if(list.get(i)>max){
    //     //     max= list.get(i);
    //     // }
    //     max= Math.max(max, list.get(i));
    // }
    // System.out.println("The maximum element in an array: "+max);
     ArrayList<Integer> list2= new ArrayList<>();
     list2.add(2);
     list2.add(5);
     list2.add(9);
     list2.add(3);
     list2.add(6);
     System.out.println("The Array list before swapping: "+list2);
    
     System.out.println("Enter the index's to swap the numbers in array: ");
     int  idx1= sc.nextInt();
     int idx2= sc.nextInt();
    
        swap(list2, idx1, idx2);
     System.out.println("The Array list after swapping: "+list2);
        sc.close();
    }
}
