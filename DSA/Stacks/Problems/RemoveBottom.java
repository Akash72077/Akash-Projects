package Problems;

import java.util.*;
public class RemoveBottom {

    public static void removeButtomIterative(Stack<Integer>s){
       Stack<Integer> st= new Stack<>();

        while (s.size()>1){
            st.push(s.pop());
        }
        s.pop();
        while (!st.isEmpty()){
            s.push(st.pop());
        }
        System.out.println(s);

    }
    public static void removeWithPosIterative(Stack<Integer>s,int pos ){
        Stack<Integer> st= new Stack<>();

        while (s.size()>pos){
            st.push(s.pop());
        }
        s.pop();
        while (!st.isEmpty()){
            s.push(st.pop());
        }
        System.out.println(s);

    }
    public static void main(String[] args) {
        Stack<Integer> s= new Stack<>();
        s.push(1);
        s.push(2);
        s.push(3);
        s.push(4);
        s.push(5);
        removeButtomIterative(s);
        removeWithPosIterative(s,3);


    }
}
