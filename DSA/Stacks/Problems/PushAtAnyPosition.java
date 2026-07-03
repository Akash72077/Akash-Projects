package Problems;

import java.util.Scanner;
import java.util.Stack;

public class PushAtAnyPosition
{
    public static void main(String[] args) {

        Stack<Integer>st= new Stack<>();
        Stack<Integer>st1= new Stack<>();
        Scanner sc= new Scanner(System.in);
        System.out.println("Enter size of stack: ");
        int n=sc.nextInt();
        System.out.println("Enter "+n+" Elements to Stack: ");
        for (int i = 0; i < n; i++) {
            st.push(sc.nextInt());
        }
        System.out.println("Enter the element which you want insert at bottom: ");
        int element= sc.nextInt();
        System.out.println("Enter the position where you want to insert: ");
        int pos=sc.nextInt();
        while(st.size()>pos){
            st1.push(st.pop());
        }
        st.push(element);
        while(!st1.isEmpty()){
            st.push(st1.pop());
        }
        System.out.println(st);
    }
}
