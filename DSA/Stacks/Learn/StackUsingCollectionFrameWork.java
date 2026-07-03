package Learn;

import java.util.Stack;
public class StackUsingCollectionFrameWork {
    public static void main(String[] args) {
        Stack<Integer> st= new Stack<>();
    st.push(1);
       st.push(2);
       st.push(4);
       st.push(5);
       st.push(7);
       st.push(9);
       st.push(11);
       st.push(13);
       st.push(12);
       st.push(99);
       st.push(43);
//       while(!st.isEmpty()){
//        System.out.println(st.peek());
//        st.pop();// printing with while loop
//       }
        System.out.println(st);// prints the stack in the form of an array

    }
}
