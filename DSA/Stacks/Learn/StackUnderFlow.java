package Learn;

import java.util.Stack;

public class StackUnderFlow {
    public static void main(String[] args) {
        Stack<Integer>st= new Stack<>();
        st.push(1);// 1
        st.push(2);// 1 2
        st.push(3);// 1 2 3
        st.push(4);// 1 2 3 4
        st.push(5);// 1 2 3 4 5
        System.out.println(st); // 1 2 3 4 5
        st.pop();
        System.out.println(st);// 1 2 3 4
        st.pop();
        System.out.println(st);// 1 2 3
        st.pop();
        System.out.println(st);// 1 2
        st.pop();
        System.out.println(st);// 1
        st.pop();
        System.out.println(st);//
        st.pop(); //stack underflow
        // it will give stack underflow error when we try to use peek or pop when stack is empty
        // and it will give empty stack expcetion


    }
}
