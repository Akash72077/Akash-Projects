package Problems;

import java.util.Scanner;
import java.util.Stack;

public class CopyStackInSameOrder {
    public static void main(String[] args) {
        Stack<Integer> st= new Stack<>();
        Stack<Integer> st1= new Stack<>();
        Stack<Integer> st2= new Stack<>();
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter number of elements you want to insert: ");
        int n= sc.nextInt();
        int i=0;
        System.out.println("Enter "+n+" Elements to Stack: ");
        while(i<n){
            st.push(sc.nextInt());
            i++;
        }
        while(!st.isEmpty()){
            st1.push(st.pop());
        }
        while(!st1.isEmpty()){
            st2.push(st1.pop());
        }
        System.out.println(st2);
    }
}
