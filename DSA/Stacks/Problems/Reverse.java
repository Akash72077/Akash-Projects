package Problems;

import java.util.Scanner;
import java.util.Stack;

public class Reverse {
    public static void reverseIterative(Stack<Integer> st){
        Stack<Integer> st1= new Stack<>();
        Stack<Integer> st2= new Stack<>();

        while(!st.isEmpty()){
            st1.push(st.pop());
        }

        while(!st1.isEmpty()){
            st2.push(st1.pop());
        }
        while(!st2.isEmpty()){
            st.push(st2.pop());
        }

        System.out.println(st);

    }
    public static void pushAtBottom(Stack<Integer>s, int data){
        if(s.isEmpty()){
            s.push(data);
            return;
        }
        int top= s.pop();
        pushAtBottom(s, data);
        s.push(top);
    }
    public static void reverseRecursive(Stack<Integer> st){
        if(st.size()==1){
            return ;
        }
        int top=st.pop();
        reverseRecursive(st);
         pushAtBottom(st,top);

    }

    public static void main(String[] args) {
        Stack<Integer> st= new Stack<>();

        Scanner sc= new Scanner(System.in);
        System.out.println("Enter number of elements you want to insert: ");
        int n= sc.nextInt();
        System.out.println("Enter "+n+" Elements to Stack: ");
        int i=0;
        while(i<n){
            st.push(sc.nextInt());
            i++;
        }
//       reverseIterative(st);
        System.out.println(st);
        reverseRecursive(st);
        System.out.println(st);

    }
}
