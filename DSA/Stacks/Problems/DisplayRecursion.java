package Problems;

import java.util.*;
public class DisplayRecursion {
    public static void displayRecReverse(Stack<Integer>st){
        if(st.isEmpty()){
            return;//base case
        }
        int top=st.pop();
        System.out.print(top+" ");

        displayRecReverse(st);
        st.push(top);
    }
    public static void displayRec(Stack<Integer>st){
        if(st.isEmpty()){
            return;
        }
        int top=st.pop();

        displayRec(st);
        System.out.print(top+" ");
        st.push(top);
    }
    public static void main(String[] args) {
        Stack<Integer> st= new Stack<>();// stack creation
        st.push(1);
        st.push(2);
        st.push(3);
        st.push(4);
        st.push(5);
        displayRecReverse(st);
        System.out.println();
        displayRec(st);//calling function

    }
}
